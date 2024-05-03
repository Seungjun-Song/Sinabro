package com.HP50.be.global.oauth.service;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.jwt.service.TokenInRedisService;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.HP50.be.global.oauth.dto.GithubAccessTokenDto;
import com.HP50.be.global.oauth.dto.GithubUserInfoDto;
import com.HP50.be.global.oauth.dto.JwtInfoDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthServiceImpl implements OAuthService{

    @Value("${GITHUB_CLIENT_ID}")
    private String clinetId;

    @Value("${GITHUB_CLIENT_SECRET}")
    private String clinetSecret;

    private final TokenInRedisService tokenInRedisService;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final JwtUtil jwtUtil;

    @Override
    public GithubAccessTokenDto resolveGithubAccessToken(String code) {
        String url = "https://github.com/login/oauth/access_token";

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); // Accept 헤더 설정

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(parameters, headers);

        parameters.add("client_id", clinetId);
        parameters.add("client_secret", clinetSecret);
        parameters.add("code", code);

        // postForEntity 메서드를 사용하여 POST 요청을 보냅니다.
        GithubAccessTokenDto githubAccessTokenDto = restTemplate.postForObject(url, request, GithubAccessTokenDto.class);
        return githubAccessTokenDto;
    }

    @Override
    public GithubUserInfoDto getUserInfo(String githubAccessToken) {
        String url = "https://api.github.com/user";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(githubAccessToken);

        // HttpEntity 객체 생성
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        GithubUserInfoDto response = restTemplate.exchange(
                "https://api.github.com/user",
                HttpMethod.GET,
                entity,
                GithubUserInfoDto.class)
                .getBody();
        return response;
    }

    @Override
    public ResponseEntity<BaseResponse<JwtInfoDto>> deliveryToFront(HttpServletRequest request,
                                                                    HttpServletResponse response,
                                                                    GithubUserInfoDto githubUserInfoDto) {

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                githubUserInfoDto, null, null
                );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtil.createToken(githubUserInfoDto.getId(),
                githubUserInfoDto.getEmail(), githubUserInfoDto.getLogin(),
                githubUserInfoDto.getHtml_url(), githubUserInfoDto.getAvatar_url(),
                JwtConstants.ACCESS_EXP_TIME * 10000);

        String refreshToken = jwtUtil.createToken(githubUserInfoDto.getId(),
                githubUserInfoDto.getEmail(), githubUserInfoDto.getLogin(),
                githubUserInfoDto.getHtml_url(), githubUserInfoDto.getAvatar_url(),
                JwtConstants.REFRESH_EXP_TIME * 10);

        Integer memberId = githubUserInfoDto.getId();
        String nickname = githubUserInfoDto.getLogin();
        String email = githubUserInfoDto.getEmail();
        String memberImg = githubUserInfoDto.getAvatar_url();
        String memberGit = githubUserInfoDto.getHtml_url();

        JwtInfoDto jwtInfoDto = JwtInfoDto.builder()
                .memberId(memberId)
                .memberName(nickname)
                .memberEmail(email)
                .memberImg(memberImg)
                .memberGit(memberGit)
                .jwtAccessToken(accessToken)
                .build();

        // id가 서버 DB에 없다면 서버에 저장
        // id가 서버 DB에 있다면 다른 액션을 취하지 않고 넘김
        // 깃허브에서 제공하는 id 를 우리 서버의 memberId로 저장
        Member member = memberRepository.findById(memberId).orElse(null);
        if(member != null) {
            memberRepository.save(Member.builder()
                    .memberId(memberId)
                    .memberName(nickname)
                    .memberEmail(email)
                    .memberImg(memberImg)
                    .memberGit(memberGit)
                    .build());
            jwtInfoDto.setNewer(true);
        }

        log.info("--------------------------OAuth 유저 출력 {} --------------------------", nickname);


        response.setHeader(JwtConstants.JWT_HEADER ,JwtConstants.JWT_TYPE + accessToken) ;
        response.setHeader(JwtConstants.REFRESH ,JwtConstants.JWT_TYPE + refreshToken);

        log.info("Authorization: {}", response.getHeader(JwtConstants.JWT_HEADER));

        response.addCookie(jwtUtil.createCookie(JwtConstants.JWT_HEADER, accessToken));
        tokenInRedisService.save(accessToken, refreshToken);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(jwtInfoDto));
    }

}

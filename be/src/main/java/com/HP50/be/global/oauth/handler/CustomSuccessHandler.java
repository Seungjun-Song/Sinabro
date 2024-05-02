package com.HP50.be.global.oauth.handler;

import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.jwt.service.TokenInRedisService;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final TokenInRedisService tokenInRedisService;

    // jwt를 검증하고 정상적이라면 호출될 메소드
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("로그인 성공 {}", authentication.getName());
        log.info("현재 주소 {}", request.getRequestURL());

        // CustomOAuth2UserService 에서 보낸 return 값이 포함되어서 전달됌
        // Principal=com.HP50.be.global.oauth.CustomOAuth2MemberDto@54c6a768
        CustomOAuth2MemberDto customUserDetails = (CustomOAuth2MemberDto) authentication.getPrincipal();

        Integer memberId = customUserDetails.getMemberId();
        String memberEmail = customUserDetails.getMemberEmail();
        String memberName = customUserDetails.getName();
        String memberGit = customUserDetails.getMemberGit();
        String memberImg = customUserDetails.getMemberImg();

        // jwtUtil에 있는 createJwt를 통해 토큰을 생성
        String accessToken = jwtUtil.createToken(memberId, memberEmail, memberName, memberGit, memberImg, JwtConstants.ACCESS_EXP_TIME);
        String refreshToken = jwtUtil.createToken(memberId, memberEmail, memberName, memberGit, memberImg, JwtConstants.REFRESH_EXP_TIME * 10);

        response.setHeader(JwtConstants.JWT_HEADER ,JwtConstants.JWT_TYPE + accessToken) ;
        response.setHeader(JwtConstants.REFRESH ,JwtConstants.JWT_TYPE + refreshToken);

        log.info("Authorization: {}", response.getHeader(JwtConstants.JWT_HEADER));

        response.addCookie(jwtUtil.createCookie(JwtConstants.JWT_HEADER, accessToken));
        tokenInRedisService.save(accessToken, refreshToken);

        //
//        String prevPage = request.getHeader("Referer");
//        log.info("이전 페이지 출력 {}", prevPage);
//        redirectStrategy.sendRedirect(request, response, prevPage);

        response.sendRedirect("https://k10e103.p.ssafy.io");
    }
}

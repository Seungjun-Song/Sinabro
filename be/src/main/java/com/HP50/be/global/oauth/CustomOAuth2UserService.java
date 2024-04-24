package com.HP50.be.global.oauth;

import com.HP50.be.domain.member.dto.CustomOAuth2MemberDto;
import com.HP50.be.domain.member.dto.MemberDto;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("userRequest:" + userRequest);
        log.info("getClientRegistraion:" + userRequest.getClientRegistration());  //client로 어떤 OAuth로 로그인이 되는지 나옴 => 깃허브니까 github
        log.info("getAccessToken:" + userRequest.getAccessToken());   //토큰 확인

        OAuth2User oAuth2User = super.loadUser(userRequest);
        // 로그인 -> code 리턴 -> accessToken 요청
        // userRequest 정보 -> loadUser함수 호출 -> 깃허브로 부터 정보 받아옴
        log.info("getAttributes:" + oAuth2User.getAttributes()); //유저 정보를 받아옴
        // 내가 어디서 정보를 제공 받았는지 확인하는 라인
        // 만약 카카오, 네이버, 구글 등 여러가지 기관에서 OAuth 를 허용했다면 RgistrationId 를 통해서 구분해서 로직을 진행해야됌
        log.info("getRegistrationId: " + userRequest.getClientRegistration().getRegistrationId());

//        회원가입
        String nickname = oAuth2User.getAttribute("login");
        String email = oAuth2User.getAttribute("email");
        String memberImg = oAuth2User.getAttribute("avatar_url");
        String memberGit = oAuth2User.getAttribute("html_url");

        Member member = this.memberRepository.findByMemberEmail(email).orElse(null);
        if(member == null){
            member = this.memberRepository.save(Member.builder()
                    .memberName(nickname)
                    .memberEmail(email)
                    .memberImg(memberImg)
                    .memberGit(memberGit)
                    .build()
            );
        }

        MemberDto memberDto = MemberDto.builder()
            .memberId(member.getMemberId())
            .memberEmail(member.getMemberEmail())
            .memberName(member.getMemberName())
            .build();

        return new CustomOAuth2MemberDto(memberDto);
    }
}



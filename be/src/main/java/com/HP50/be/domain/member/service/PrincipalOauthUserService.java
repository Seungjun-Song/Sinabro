package com.HP50.be.domain.member.service;

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
public class PrincipalOauthUserService extends DefaultOAuth2UserService {

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

//        회원가입
        String nickname = oAuth2User.getAttribute("login");
        String email = oAuth2User.getAttribute("email");
        String memberImg = oAuth2User.getAttribute("avatar_url");
        String memberGit = oAuth2User.getAttribute("html_url");

        Member memberEntity = memberRepository.findByMemberEmail(email).orElse(null);
//      정보가 없으면 회원가입
        if (memberEntity == null) {
            memberEntity = Member.builder()
                    .memberName(nickname)
                    .memberEmail(email)
                    .memberImg(memberImg)
                    .memberGit(memberGit)
                    .build();
            memberRepository.save(memberEntity);
        }

        return super.loadUser(userRequest);
    }
}



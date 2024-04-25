package com.HP50.be.global.oauth;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.global.jwt.JwtPayloadDto;
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

    // 로그인이 되면 자동으로 실행되는 메소드
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 로그인 시 전달받은 정보 저장
        OAuth2User oAuth2User = super.loadUser(userRequest);
        // userRequest 정보 -> loadUser함수 호출 -> 깃허브로 부터 정보 받아옴
        log.info("getAttributes:" + oAuth2User.getAttributes()); //유저 정보를 받아옴
        // 내가 어디서 정보를 제공 받았는지 확인하는 라인
        // 만약 카카오, 네이버, 구글 등 여러가지 기관에서 OAuth 를 허용했다면 RgistrationId 를 통해서 구분해서 로직을 진행해야됌
        log.info("getRegistrationId: " + userRequest.getClientRegistration().getRegistrationId());

        // 로그인 시 전달받은 정보는 OAuth2User 내부에 Map 형식으로 저장되고 있음
        // getAttritube 를 통해서 key 값을 통해 value 제공받음
        Integer memberId = oAuth2User.getAttribute("id");
        String nickname = oAuth2User.getAttribute("login");
        String email = oAuth2User.getAttribute("email");
        String memberImg = oAuth2User.getAttribute("avatar_url");
        String memberGit = oAuth2User.getAttribute("html_url");


        // id가 서버 DB에 없다면 서버에 저장
        // id가 서버 DB에 있다면 다른 액션을 취하지 않고 넘김
        // 깃허브에서 제공하는 id 를 우리 서버의 memberId로 저장
        this.memberRepository.findById(memberId).orElse(this.memberRepository.save(Member.builder()
                .memberId(memberId)
                .memberName(nickname)
                .memberEmail(email)
                .memberImg(memberImg)
                .memberGit(memberGit)
                .build()));


        // CustomOAuth2MemberDto 는 OAuth2User 를 상속받아서 구현
        // 그때 jwtPayloadDto 를 주입받음
        // 해당 클래스를 리턴해주기 위해 member 를 jwtPayloadDto 로 변환하는 과정
        JwtPayloadDto jwtPayloadDto = JwtPayloadDto.builder()
                .memberId(memberId)
                .memberName(nickname)
                .memberEmail(email)
                .memberImg(memberImg)
                .memberGit(memberGit)
                .build();

        // 이게 정상적으로 실행된다면 CustomSuccessHandler의 onAuthentication 메소드가 실행된다.
        // 해당 연결은 SecurityConfig의 filterChain로 연결시켜주었다.
        return new CustomOAuth2MemberDto(jwtPayloadDto);
    }
}



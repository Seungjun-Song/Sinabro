package com.HP50.be.global.oauth.handler;

import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;

    // jwt를 검증하고 정상적이라면 호출될 메소드
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        StringBuilder tokenParam = new StringBuilder();

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
        String accessToken = jwtUtil.createAccessJwt(memberId, memberEmail, memberName, memberGit, memberImg);
        String refreshToken = jwtUtil.createRefreshJwt();

        Authentication accessTokenAuth = new UsernamePasswordAuthenticationToken(accessToken, true);

        tokenParam.append("accessToken=").append(accessToken).append("&")
                .append("refreshToken=").append(refreshToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomOAuth2MemberDto customUserContext = (CustomOAuth2MemberDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(customUserContext.getName());
        response.sendRedirect("http://localhost:8080/api/jwt?" + tokenParam);
    }
}

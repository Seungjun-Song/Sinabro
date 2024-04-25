package com.HP50.be.global.oauth;

import com.HP50.be.global.jwt.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;

    // jwt를 검증하고 정상적이라면 호출될 메소드
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // CustomOAuth2UserService 에서 보낸 return 값이 포함되어서 전달됌
        // Principal=com.HP50.be.domain.member.dto.CustomOAuth2MemberDto@31fc9aca
        System.out.println("request = " + request + ", response = " + response + ", authentication = " + authentication);
        CustomOAuth2MemberDto customUserDetails = (CustomOAuth2MemberDto) authentication.getPrincipal();

        Integer memberId = customUserDetails.getMemberId();
        String memberEmail = customUserDetails.getMemberEmail();
        String memberName = customUserDetails.getName();

        // jwtUtil에 있는 createJwt를 통해 토큰을 생성
        String token = jwtUtil.createJwt(memberId, memberEmail, memberName, 60*60*60L);

        response.addCookie(createCookie(token));
        response.sendRedirect("http://localhost:8080");
    }

    private Cookie createCookie(String value) {

        Cookie cookie = new Cookie("Authorization", value);
        cookie.setMaxAge(60*60*60);
        //cookie.setSecure(true);
        cookie.setPath("/api/hi");
        cookie.setHttpOnly(true);
        return cookie;
    }

}

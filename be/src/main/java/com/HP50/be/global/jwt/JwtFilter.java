package com.HP50.be.global.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        System.out.println(getJwt(request));
        // 로그인 또는 토큰 재발행이라면 일반적인 필터를 적용 (doFilter)
        if(path.equals("/api/login") || path.equals("/api/token")){
            filterChain.doFilter(request, response);
            return;
        }
    }

    private String getJwt(HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        return authorizationHeader;
    }
}

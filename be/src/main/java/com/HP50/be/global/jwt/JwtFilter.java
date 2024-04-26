package com.HP50.be.global.jwt;

import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

//  각 요청에 대해 한 번만 실행. 필터 체인 내에서 한 번만 실행되도록 보장
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private static final String[] whiteList = {};// {"/api/login"};

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // url = http://localhost:8080
        // uri = /api/login
        String requestUri = request.getRequestURI();
        String header = request.getHeader(JwtConstants.ACCESS);
        log.info("not filter {}", header);
        return PatternMatchUtils.simpleMatch(whiteList, requestUri);
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        filterChain.doFilter(request, response);
    }
}

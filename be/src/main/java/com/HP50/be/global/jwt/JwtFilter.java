package com.HP50.be.global.jwt;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
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
import java.security.Signature;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

//  각 요청에 대해 한 번만 실행. 필터 체인 내에서 한 번만 실행되도록 보장
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private static final String[] whiteList = {"/api/*"};

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // url = http://localhost:8080
        // uri = /api/login
        String requestUri = request.getRequestURI();
        String header = request.getHeader(JwtConstants.JWT_HEADER);
        log.info("shouldNotFilter {}", header);
        return PatternMatchUtils.simpleMatch(whiteList, requestUri);
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("SecurityContextHolder에서 출력한 값 {}", SecurityContextHolder.getContext().getAuthentication());
            String requestUri = request.getRequestURI();
            String header = request.getHeader(JwtConstants.JWT_HEADER);
            System.out.println("header = " + header);
            System.out.println("requestUri = " + requestUri);

            if (header == null || !header.startsWith(JwtConstants.JWT_TYPE))
                log.error("Authorization Bearer Token Expired {}", requestUri);

            String token = header.split(" ")[1];
        } catch (SignatureException e) {
            setErrorResponse(response, StatusCode.INVALID_TOKEN);
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            setErrorResponse(response, StatusCode.DAMAGED_ACCESS_TOKEN);
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
            setErrorResponse(response, StatusCode.EXPIRED_ACCESS_TOKEN);
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
            setErrorResponse(response, StatusCode.UNSUPPORTED_ACCESS_TOKEN);
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
            setErrorResponse(response, StatusCode.ILLEGAL_ARGUMENT_TOKEN);
        } catch (NullPointerException e) {
            log.error("JWT  is empty: {}", e.getMessage());
            setErrorResponse(response, StatusCode.INVALID_NULL_TOKEN);
        }

        filterChain.doFilter(request, response);
    }
    public static void setErrorResponse(HttpServletResponse response, StatusCode statusCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(200);
        ObjectMapper objectMapper = new ObjectMapper();

        BaseResponse<Object> baseResponse = new BaseResponse<>(statusCode);

        objectMapper.writeValue(response.getWriter(), baseResponse);
    }
}

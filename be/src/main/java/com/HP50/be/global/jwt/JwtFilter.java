package com.HP50.be.global.jwt;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Signature;
import java.util.Collection;
import java.util.Enumeration;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

//  각 요청에 대해 한 번만 실행. 필터 체인 내에서 한 번만 실행되도록 보장
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    private static final List<String> PERMIT_URLS =
            List.of("/users/**", "/auth/**");
//    List.of("/users/**", "/login", "/auth/**");
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) {
//        String path = request.getServletPath();
//        log.info("PERMIT_URLS에 해당되면 InternalFilter 를 거치지 않음 {}", path);
//        return PERMIT_URLS.stream()
//                .anyMatch(exclude -> pathMatcher.match(exclude, path));
//    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = request.getHeader(JwtConstants.JWT_HEADER);
        log.info("현재 URL: {}", request.getRequestURL());
        log.info("토큰 출력 {}" , token);
//        } catch (SignatureException e) {
//            setErrorResponse(response, StatusCode.INVALID_TOKEN);
//            log.error("Invalid JWT signature: {}", e.getMessage());
//        } catch (MalformedJwtException e) {
//            log.error("Invalid JWT token: {}", e.getMessage());
//            setErrorResponse(response, StatusCode.DAMAGED_ACCESS_TOKEN);
//        } catch (ExpiredJwtException e) {
//            log.error("JWT token is expired: {}", e.getMessage());
//            setErrorResponse(response, StatusCode.EXPIRED_ACCESS_TOKEN);
//        } catch (UnsupportedJwtException e) {
//            log.error("JWT token is unsupported: {}", e.getMessage());
//            setErrorResponse(response, StatusCode.UNSUPPORTED_ACCESS_TOKEN);
//        } catch (IllegalArgumentException e) {
//            log.error("JWT claims string is empty: {}", e.getMessage());
//            setErrorResponse(response, StatusCode.ILLEGAL_ARGUMENT_TOKEN);
//        } catch (NullPointerException e) {
//            log.error("JWT is empty: {}", e.getMessage());
//            setErrorResponse(response, StatusCode.INVALID_NULL_TOKEN);
//        }

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

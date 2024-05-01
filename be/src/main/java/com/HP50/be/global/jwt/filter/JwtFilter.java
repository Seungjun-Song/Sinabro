package com.HP50.be.global.jwt.filter;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.jwt.dto.JwtPayloadDto;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.List;


//  각 요청에 대해 한 번만 실행. 필터 체인 내에서 한 번만 실행되도록 보장
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    private static final List<String> PERMIT_URLS = List.of("/users/**", "/login/**", "/auth/**");

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        log.info("PERMIT_URLS에 해당되면 InternalFilter 를 거치지 않음 {}", path);
        return PERMIT_URLS.stream()
                .anyMatch(exclude -> pathMatcher.match(exclude, path));
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("Authorization")) {
                token = cookie.getValue();
                break;
            }
        }

        if (token == null) {
            log.info("token null");
            filterChain.doFilter(request, response);
            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        if (jwtUtil.isExpired(token)) {
            System.out.println("token expired");
            filterChain.doFilter(request, response);
            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //userDTO를 생성하여 값 set
        JwtPayloadDto jwtPayloadDto = JwtPayloadDto.builder()
                .memberId(jwtUtil.getMemberId(token))
                .memberEmail(jwtUtil.getEmail(token))
                .memberName(jwtUtil.getMemberName(token))
                .memberImg(jwtUtil.getMemberImg(token))
                .memberGit(jwtUtil.getMemberGit(token))
                .build();

        CustomOAuth2MemberDto customOAuth2MemberDto = new CustomOAuth2MemberDto(jwtPayloadDto);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2MemberDto, null, customOAuth2MemberDto.getAuthorities());
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);
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

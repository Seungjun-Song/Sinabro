package com.HP50.be.global.jwt.filter;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.jwt.dto.JwtPayloadDto;
import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import com.HP50.be.global.jwt.service.TokenInRedisService;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
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
import java.util.List;
import java.util.Optional;


//  각 요청에 대해 한 번만 실행. 필터 체인 내에서 한 번만 실행되도록 보장
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final TokenInRedisService tokenInRedisService;

    private static final List<String> PERMIT_URLS = List.of("/users/**", "/login/**", "/auth/**,", "/room/**", "/api/**");

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
        log.info("---------------------------------------------JwtFilter---------------------------------------------");
        try{
            // 쿠키에서 토큰을 꺼냄
            // 토큰이 없다면 null
            String token = jwtUtil.tokenFromRequest(request);

            if(token.isEmpty()) {
                log.info("토큰이 없는 유저입니다.");
                filterChain.doFilter(request, response);
                return;
            }

            // 토큰이 만료되었거나 없다면 토큰 갱신 신청
            if (jwtUtil.isExpired(token)) {
                // refreshToken 이 Redis에 남아있다면 로그인 정보를 갱신
                RedisJwtEntity redisJwtEntity = tokenInRedisService.findByMemberName(token).orElse(null);
                // 리프레시 토큰이 레디스에 남아있다면 새로운 토큰으로 갱신
                if(redisJwtEntity == null){
                    log.info("토큰이 없는 유저입니다.");
                    filterChain.doFilter(request, response);
                    return;
                }

                Integer memberId = jwtUtil.getMemberId(token);
                String memberEmail = jwtUtil.getEmail(token);
                String memberName = jwtUtil.getMemberName(token);
                String memberGit = jwtUtil.getMemberGit(token);
                String memberImg = jwtUtil.getMemberImg(token);

                // 만료된 토큰은 새로운 토큰으로 교환
                token = jwtUtil.createToken(memberId, memberEmail, memberName, memberGit, memberImg, JwtConstants.ACCESS_EXP_TIME);
                response.addCookie(jwtUtil.createCookie(JwtConstants.JWT_HEADER, token));
                log.info("토큰 재발급 완료!");

            }

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
        } catch (SignatureException e) {
            setErrorResponse(response, StatusCode.INVALID_TOKEN);
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            setErrorResponse(response, StatusCode.DAMAGED_ACCESS_TOKEN);
        }
//        catch (ExpiredJwtException e) {
//            log.error("JWT token is expired: {}", e.getMessage());
//            setErrorResponse(response, StatusCode.EXPIRED_ACCESS_TOKEN);
//        }
        catch (UnsupportedJwtException e) {
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

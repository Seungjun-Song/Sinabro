package com.HP50.be.global.config;

import com.HP50.be.global.jwt.filter.JwtFilter;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.oauth.CustomOAuth2UserService;
import com.HP50.be.global.oauth.handler.CustomFailureHandler;
import com.HP50.be.global.oauth.handler.CustomSuccessHandler;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
// Security를 활성화 하겠다.
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomSuccessHandler customSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomFailureHandler customFailureHandler;
    private final JwtUtil jwtUtil;
    private final JwtFilter jwtFilter;
//    private final CorsConfig corsConfig;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // .csrf(csrf -> csrf.disabled()) 같은 표현
                .csrf(CsrfConfigurer::disable)
                .cors(cors -> cors
                        .configurationSource(configurationSource())
                )
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )
                .oauth2Login(auth -> auth
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(customOAuth2UserService)) // OAuth2 로그인 성공 시, 후작업을 진행할 UserService 인터페이스 구현체 등록
                        .successHandler(customSuccessHandler) // 성공적으로 로그인을 마쳤을 때 발동되는 handler
                        .failureHandler(customFailureHandler)
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // UsernamePasswordAuthenticationFilter 얘가 실행되기 전에 cors 필터를 실행한다.
                // STATELESS 형태로 관리
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    protected CorsConfigurationSource configurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");
//        corsConfiguration.setAllowedOrigins(List.of("/users/**", "/login/**", "/auth/**,", "/room/**"));
//        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}

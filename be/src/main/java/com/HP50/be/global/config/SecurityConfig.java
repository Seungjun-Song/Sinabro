package com.HP50.be.global.config;

import com.HP50.be.global.jwt.JwtFilter;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.oauth.CustomOAuth2UserService;
import com.HP50.be.global.oauth.handler.CustomFailureHandler;
import com.HP50.be.global.oauth.handler.CustomSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
// Security를 활성화 하겠다.
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomSuccessHandler customSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomFailureHandler customFailureHandler;
    private final JwtUtil jwtUtil;
    private final CorsConfig corsConfig;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/api/login").permitAll()
//                        .anyRequest().authenticated()
                                .anyRequest().permitAll()
                )
                .oauth2Login(auth -> auth
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(customOAuth2UserService)) // oauth 로그인 시 발동되는 service
                        .successHandler(customSuccessHandler) // 성공적으로 로그인을 마쳤을 때 발동되는 handler
                        .failureHandler(customFailureHandler)
                )
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                // STATELESS 형태로 관리
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}

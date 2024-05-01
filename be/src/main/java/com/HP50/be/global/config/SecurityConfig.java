package com.HP50.be.global.config;

import com.HP50.be.global.jwt.filter.JwtFilter;
import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.oauth.CustomOAuth2UserService;
import com.HP50.be.global.oauth.handler.CustomFailureHandler;
import com.HP50.be.global.oauth.handler.CustomSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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
    private final JwtFilter jwtFilter;
    private final CorsConfig corsConfig;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // .csrf(csrf -> csrf.disabled()) 같은 표현
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class)

                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )
                .oauth2Login(auth -> auth
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
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
}

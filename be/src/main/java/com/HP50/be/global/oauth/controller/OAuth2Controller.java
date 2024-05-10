package com.HP50.be.global.oauth.controller;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.oauth.dto.GithubAccessTokenDto;
import com.HP50.be.global.oauth.dto.GithubUserInfoDto;
import com.HP50.be.global.oauth.dto.JwtInfoDto;
import com.HP50.be.global.oauth.service.OAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Tag(name = "로그인 OAuth", description = "로그인 및 OAuth 관련된 API 모음입니다.")
@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
@Slf4j
public class OAuth2Controller {

    private final OAuthService oAuthService;
    @GetMapping("/{code}")
    public ResponseEntity<BaseResponse<JwtInfoDto>> toGithub(HttpServletRequest request,
                                                             HttpServletResponse response,
                                                             @PathVariable String code){
        String accessToken = oAuthService.resolveGithubAccessToken(code).getAccess_token();
        GithubUserInfoDto githubUserInfoDto = oAuthService.getUserInfo(accessToken);

        return oAuthService.deliveryToFront(request, response, githubUserInfoDto);
    }

    @Operation(summary = "로그아웃", description = "쿠키의 유효시간을 0으로 만들어서 삭제합니다.")
    @DeleteMapping
    public ResponseEntity<BaseResponse<StatusCode>> logout(HttpServletResponse response){
        Cookie cookie = new Cookie(JwtConstants.JWT_HEADER, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }
}

package com.HP50.be.global.oauth.controller;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.oauth.dto.GithubAccessTokenDto;
import com.HP50.be.global.oauth.dto.GithubUserInfoDto;
import com.HP50.be.global.oauth.dto.JwtInfoDto;
import com.HP50.be.global.oauth.service.OAuthService;
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
}

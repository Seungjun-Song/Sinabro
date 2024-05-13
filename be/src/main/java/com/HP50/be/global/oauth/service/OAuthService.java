package com.HP50.be.global.oauth.service;

import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.oauth.dto.GithubAccessTokenDto;
import com.HP50.be.global.oauth.dto.GithubUserInfoDto;
import com.HP50.be.global.oauth.dto.JwtInfoDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface OAuthService {
    GithubAccessTokenDto resolveGithubAccessToken(String code);
    GithubUserInfoDto getUserInfo(String githubAccessToken);
    ResponseEntity<BaseResponse<JwtInfoDto>> deliveryToFront(HttpServletRequest request,
                                                             HttpServletResponse response,
                                                             GithubUserInfoDto githubUserInfoDto);

}

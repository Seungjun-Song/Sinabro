package com.HP50.be.global.oauth.dto;

import lombok.Data;

@Data
public class GithubAccessTokenDto {
    private String access_token;
    private String scope;
    private String token_type;

}

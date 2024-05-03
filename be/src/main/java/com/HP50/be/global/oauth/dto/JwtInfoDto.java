package com.HP50.be.global.oauth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtInfoDto {
    private String jwtAccessToken;
    private String memberName;
}

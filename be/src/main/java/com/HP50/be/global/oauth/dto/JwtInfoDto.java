package com.HP50.be.global.oauth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtInfoDto {
    private String jwtAccessToken;
    private Integer memberId;
    private String memberName;
    private String memberImg;
    private String memberEmail;
    private String memberGit;
    private boolean isNewer;
}

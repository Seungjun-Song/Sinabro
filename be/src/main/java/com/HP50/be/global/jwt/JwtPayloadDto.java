package com.HP50.be.global.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtPayloadDto {
    // jwt payload에 들어갈 field
    private Integer memberId;
    private String memberEmail;
    private String memberName;
    private String memberGit;
    private String memberImg;
}
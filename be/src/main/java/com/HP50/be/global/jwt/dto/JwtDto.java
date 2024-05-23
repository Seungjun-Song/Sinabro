package com.HP50.be.global.jwt.dto;

import lombok.Data;

@Data
public class JwtDto {
    private Integer memberId;
    private String accessToken;
    private String refreshToken;
}

package com.HP50.be.global.jwt.dto;

import lombok.Data;

@Data
public class JwtDto {
    private String authorization;
    private String accessToken;
    private String refreshToken;
}

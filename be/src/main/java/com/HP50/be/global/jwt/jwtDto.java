package com.HP50.be.global.jwt;

import lombok.Data;

@Data
public class jwtDto {
    private String authorization;
    private String accessToken;
    private String refreshToken;
}

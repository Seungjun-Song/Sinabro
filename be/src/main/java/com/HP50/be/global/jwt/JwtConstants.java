package com.HP50.be.global.jwt;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

// 기본 생성자를 가지지만 외부에서는 접근할 수 없음
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtConstants {
    public static final String COMPANY = "HP50";
    public static final long ACCESS_EXP_TIME = 60000 * 60;   // 1시간 분 설정
    public static final long REFRESH_EXP_TIME = 60000 * 60 * 24;   // 24시간 설정

    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_TYPE = "BEARER ";

    public static final String ACCESS = "access_token ";
    public static final String REFRESH = "refresh_token ";
}

package com.HP50.be.global.jwt.entity;

import com.HP50.be.global.jwt.JwtConstants;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash(value = "token", timeToLive = JwtConstants.REFRESH_EXP_TIME) // key 값의 prefix로 사용
public class RedisJwtEntity {

    /**
     * 일반적으로 rdbms 에서 사용되는 auto increment 로 생각하면 될 듯 <br>
     * 레디스에서 중복된 Id가 있다면 덮어씌움 <br>
     * token: {id} 에 위치됨
     */
    @Id
    private String memberName;
    private String refreshToken;
}

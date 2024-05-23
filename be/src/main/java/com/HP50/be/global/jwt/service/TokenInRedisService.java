package com.HP50.be.global.jwt.service;

import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import java.util.Optional;

public interface TokenInRedisService {
    Optional<RedisJwtEntity> findByMemberName(String token);
    // accessToken 을 통해 이름을 알아낸 후
    // 해당 이름을 redis에 refreshToken 과 함께 저장
    void save(String accessToken, String refreshToken);
    Iterable<RedisJwtEntity> findAll();
}

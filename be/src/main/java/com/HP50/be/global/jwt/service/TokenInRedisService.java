package com.HP50.be.global.jwt.service;

import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import java.util.Optional;

public interface TokenInRedisService {
    Optional<RedisJwtEntity> findByMemberName(String token);
    void save(String accessToken, String refreshToken);
}

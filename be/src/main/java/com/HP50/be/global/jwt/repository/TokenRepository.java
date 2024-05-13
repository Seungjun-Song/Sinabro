package com.HP50.be.global.jwt.repository;

import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<RedisJwtEntity, String> {

    Optional<RedisJwtEntity> findByMemberName(String accessToken);
}

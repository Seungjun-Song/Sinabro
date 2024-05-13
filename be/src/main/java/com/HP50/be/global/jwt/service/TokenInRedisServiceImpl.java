package com.HP50.be.global.jwt.service;

import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import com.HP50.be.global.jwt.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenInRedisServiceImpl implements TokenInRedisService {

    private final TokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    @Override
    // 캐시의 이름을 refreshToken 으로 지정하고 캐시의 키는 메소드의 token 파라미터를 사용한다.
    @Cacheable(value = "refreshToken", key="#token")
    public Optional<RedisJwtEntity> findByMemberName(String token) {
        return tokenRepository.findByMemberName(token);
    }

    public Iterable<RedisJwtEntity> findAll(){
        return tokenRepository.findAll();
    }

    @Override
    public void save(String accessToken, String refreshToken) {
        String memberName = jwtUtil.getMemberName(accessToken);
        RedisJwtEntity token = RedisJwtEntity.builder()
                .memberName(memberName)
                .refreshToken(refreshToken)
                .build();
        tokenRepository.save(token);
    }


}

package com.HP50.be.global.jwt.service;

import com.HP50.be.global.jwt.JwtUtil;
import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import com.HP50.be.global.jwt.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenInRedisServiceImpl implements TokenInRedisService {

    private final TokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    @Override
    public Optional<RedisJwtEntity> findByMemberName(String token) {
        return Optional.empty();
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

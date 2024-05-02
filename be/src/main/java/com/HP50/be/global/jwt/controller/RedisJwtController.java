package com.HP50.be.global.jwt.controller;

import com.HP50.be.global.jwt.entity.RedisJwtEntity;
import com.HP50.be.global.jwt.service.TokenInRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * jwt 가 생성 되었는지 테스트 하기 위한 컨트롤러
 * @author 박종국 
 * @deprecated
 */

@RestController
@RequestMapping("/redis")
@RequiredArgsConstructor
public class RedisJwtController {
    private final TokenInRedisService tokenInRedisService;

    @GetMapping("/tokens")
    public Iterable<RedisJwtEntity> findAll(){
        return tokenInRedisService.findAll();
    }
}

package com.HP50.be.global.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class RedisDataCleaner implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Set<String> keys = redisTemplate.keys("Room*");
        assert keys != null;
        if (!keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}

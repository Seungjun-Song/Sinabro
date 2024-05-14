package com.HP50.be.global.config;

import com.siot.IamportRestClient.IamportClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PortOneConfig {
    @Value("${portOne.api}")
    private String apiKey;
    @Value("${portOne.secret}")
    private String secretKey;

    @Bean
    public IamportClient iamportClient() {
        return new IamportClient(apiKey, secretKey);
    }
}

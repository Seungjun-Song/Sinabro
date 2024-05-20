package com.HP50.be.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@OpenAPIDefinition(
        info = @Info(title = "시나브로의 API 명세서",
        description = "팀 HP50입니다.",
        version = "v1")
)
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

}

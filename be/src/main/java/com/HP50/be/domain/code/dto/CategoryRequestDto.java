package com.HP50.be.domain.code.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CategoryRequestDto {
    @Schema(example = "200", description = "200 이면 백엔드")
    Integer categoryId;
}

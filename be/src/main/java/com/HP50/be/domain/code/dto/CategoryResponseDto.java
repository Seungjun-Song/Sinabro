package com.HP50.be.domain.code.dto;

import com.HP50.be.domain.code.entity.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CategoryResponseDto {
    @Schema(example = "100", description = "대분류의 고유 번호")
    private Integer categoryId;

    @Schema(example = "프론트엔드", description = "대분류의 이름")
    private String categoryJob;
}

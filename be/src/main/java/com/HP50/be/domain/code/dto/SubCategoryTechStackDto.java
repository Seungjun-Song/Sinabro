package com.HP50.be.domain.code.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubCategoryTechStackDto {
    @Schema(example = "101")
    private Integer subCategoryId;
    @Schema(example = "React")
    private String subCategoryJob;
}

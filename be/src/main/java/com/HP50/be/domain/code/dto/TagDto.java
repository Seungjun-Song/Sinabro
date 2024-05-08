package com.HP50.be.domain.code.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Builder
public class TagDto {
    @Schema(example = "101")
    private Integer subCategoryId;

    @Schema(example = "React")
    private String subCategoryName;

    @Schema(example = "100")
    private Integer categoryId;
}

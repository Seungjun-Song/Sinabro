package com.HP50.be.domain.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TechStackResponseDto {
    private Integer techStackId;
    private Integer subCategoryId;
    private String subCategoryName;
}

package com.HP50.be.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TechStackResponseDto {
    @Schema(description = "해당 기술 스택의 고유번호 - 어느 멤버의 어느 기술인지 분별가능", example = "4")
    private Integer techStackId;

    @Schema(description = "나의 기술스택이 해당되는 서브 카테고리 ID", example = "201")
    private Integer subCategoryId;
    
    @Schema(description = "기술 스택의 이름", example = "스프링부트")
    private String subCategoryName;
}

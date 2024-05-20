package com.HP50.be.domain.memoryGraph.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemoResponseDto {
    @Schema(example = "샘플 타이틀")
    private String title;
    @Schema(example = "샘플 컨텐츠")
    private String content;
    @Schema(example = "#775414")
    private String color;
}

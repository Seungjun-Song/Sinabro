package com.HP50.be.domain.memoryGraph.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemoRequestDto {
    @Schema(example = "c06ac3f2-a312-40d6-8cbd-f19b6bdcc36b")
    private String memoId;
    @Schema(example = "샘플 타이틀")
    private String title;
    @Schema(example = "샘플 컨텐츠")
    private String content;
}

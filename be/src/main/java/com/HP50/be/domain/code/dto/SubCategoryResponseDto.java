package com.HP50.be.domain.code.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SubCategoryResponseDto {
    @Schema(name = "게시글의 모집여부", example = "팀원 구해요")
    private String subCategoryBoard;

    @Schema(name = "게시글의 현재 진행상황", example = "모집 완료")
    private String subCategoryCalender;
}

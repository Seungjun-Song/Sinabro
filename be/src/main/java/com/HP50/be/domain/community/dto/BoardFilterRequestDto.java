package com.HP50.be.domain.community.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardFilterRequestDto {
    // 팀원 구해요 401, 팀 구해요 402, 피드백 원해요 403
    @Schema(example = "401")
    private Integer subCategoryBoard;
    
    // 진행 중 502, 진행 완료 503
    @Schema(example = "501")
    private Integer subCategoryCalender;

    // 100 = 프론트 , 200 = 백, 300 = 풀스택, 0 = 모두 다
    @Schema(example = "100")
    private Integer categoryJob;

    // 공백이라면 모든 값
    @Schema(example = "백엔드 구해요")
    private String searchTitle;
}

package com.HP50.be.domain.calender.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MilestoneResponseDto {
    @Schema(example = "1")
    private Integer milestoneId;
    @Schema(example = "샘플 타이틀")
    private String milestoneTitle;
    @Schema(example = "샘플 내용")
    private String milestoneContent;
    @Schema(example = "2024-05-11")
    private LocalDate milestoneStartDt;
    @Schema(example = "2024-05-21")
    private LocalDate milestoneEndDt;
    @Schema(example = "5")
    private Integer projectId;
    @Schema(example = "502", description = "502: 진행중, 503: 완료")
    private Integer subCategoryId;
}

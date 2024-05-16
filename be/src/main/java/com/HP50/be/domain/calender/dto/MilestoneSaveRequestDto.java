package com.HP50.be.domain.calender.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MilestoneSaveRequestDto {
    @Schema(example = "1", description = "세이브라면 ID 를 보내지 않음\n업데이트라면 ID 를 보내줘야 됌")
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

package com.HP50.be.domain.calender.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@Builder
public class CreateCalenderRequestDto {
    @Schema(example = "5", description = "프로젝트의 번호")
    Integer projectId;
    @Schema(example = "94429120", description = "담당자의 번호")
    Integer managerId;
    @Schema(example = "1", description = "선택사항임")
    Integer milestoneId;
    @Schema(example = "2024-05-12", description = "일정 시작일")
    LocalDate calenderStartDt;
    @Schema(example = "2024-05-18", description = "일정 마지막 일")
    LocalDate calenderEndDt;
    @Schema(example = "test 일정", description = "일정의 이름")
    String calenderName;
}

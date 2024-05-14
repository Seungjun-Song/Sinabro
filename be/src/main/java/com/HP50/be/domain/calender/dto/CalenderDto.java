package com.HP50.be.domain.calender.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalenderDto {
    @Schema(name = "일정 고유 번호", example = "127")
    Integer calenderId;
    @Schema(name = "담당자 고유 ID", example = "139435006")
    Integer memberId;
    @Schema(name = "담당자 프로필 이미지", example = "https://avatars.githubusercontent.com/u/139435006?v=4")
    String memberImg;
    @Schema(name = "담당자 이름", example = "JH201421228")
    String memberName;

    @Schema(example = "마일스톤의 고유 번호")
    private Integer milestoneId;

    @Schema(example = "마일스톤의 이름")
    private String milestoneName;

    @Schema(name = "일정 상태 코드", example = "502")
    Integer subCategoryId;
    @Schema(name = "일정 시작일", example = "2024-05-02")
    LocalDate calenderStartDt;
    @Schema(name = "일정 종료일", example = "2024-05-03")
    LocalDate calenderEndDt;
    @Schema(name = "일정 이름", example = "시나브로 작성 API 개발")
    String calenderName;
}

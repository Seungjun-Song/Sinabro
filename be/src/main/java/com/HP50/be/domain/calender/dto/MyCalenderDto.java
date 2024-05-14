package com.HP50.be.domain.calender.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyCalenderDto {
    private Integer calenderId;
    private Integer subCategoryId;
    private LocalDate calenderStartDt;
    private LocalDate calenderEndDt;
    private String calenderName;
    private Integer milestoneId;
    private String milestoneName;

    public MyCalenderDto(Integer calenderId, Integer subCategoryId, LocalDate calenderStartDt, LocalDate calenderEndDt, String calenderName) {
        this.calenderId = calenderId;
        this.subCategoryId = subCategoryId;
        this.calenderStartDt = calenderStartDt;
        this.calenderEndDt = calenderEndDt;
        this.calenderName = calenderName;
    }
}

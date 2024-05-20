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
}

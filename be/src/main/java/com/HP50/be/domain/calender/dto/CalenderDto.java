package com.HP50.be.domain.calender.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalenderDto {
    Integer calenderId;
    Integer memberId;
    String memberImg;
    String memberName;
    Integer subCategoryId;
    LocalDate calenderStartDt;
    LocalDate calenderEndDt;
    String calenderName;
}

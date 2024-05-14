package com.HP50.be.domain.calender.dto;


import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@Builder
public class CreateCalenderRequestDto {
    Integer projectId;
    Integer managerId;
    LocalDate calenderStartDt;
    LocalDate calenderEndDt;
    String calenderName;
}

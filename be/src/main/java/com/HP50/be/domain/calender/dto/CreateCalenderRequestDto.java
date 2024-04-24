package com.HP50.be.domain.calender.dto;

import com.HP50.be.domain.calender.repository.CalenderRepository;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

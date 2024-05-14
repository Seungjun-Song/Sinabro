package com.HP50.be.domain.calender.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalenderRequestDto {
    Integer calenderId;
    Integer projectId;
    Integer milestoneId;
    Integer subCategoryId;
}

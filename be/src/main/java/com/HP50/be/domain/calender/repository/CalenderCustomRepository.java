package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.dto.MyCalenderDto;

import java.util.List;

public interface CalenderCustomRepository {
    List<MyCalenderDto> getMySchedulesInProject(int memberId, int projectId);
}

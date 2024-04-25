package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;

import java.util.List;

public interface CalenderCustomRepository {
    // 프로젝트에서 나의 일정
    List<MyCalenderDto> getMySchedulesInProject(int memberId, int projectId);
    // 나의 전체 일정
    List<MyCalenderDto> getMySchedules(int memberId);
    // 프로젝트 전체 일정
    List<CalenderDto> getProjectCalender(int projectId);
}

package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.CalenderRequestDto;
import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;

import java.util.List;

public interface CalenderService {
    //일정추가
    public boolean createCalender(int memberId, CreateCalenderRequestDto requestDto);
    // 일정 상태 수정
    public boolean updateCalender(int memberId, CalenderRequestDto requestDto);
    // 일정 삭제
    public boolean deleteCalender(int memberId,CalenderRequestDto requestDto);
    // 프로젝트에서 나의 일정 조회
    List<MyCalenderDto> getMySchedulesInProject(int memberId,int projectId);
    //나의 전체 일정 조회
    List<MyCalenderDto> getMySchedules(int memberId);
}

package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.CalenderRequestDto;
import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;

public interface CalenderService {
    //일정추가
    public boolean createCalender(int memberId, CreateCalenderRequestDto requestDto);
    // 일정 상태 수정
    public boolean updateCalender(int memberId, CalenderRequestDto requestDto);
    // 일정 삭제
    public boolean deleteCalender(int memberId,CalenderRequestDto requestDto);
}

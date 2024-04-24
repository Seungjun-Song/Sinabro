package com.HP50.be.domain.calender.controller;

import com.HP50.be.domain.calender.dto.CalenderRequestDto;
import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;
import com.HP50.be.domain.calender.service.CalenderService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class CalenderController {
    private final CalenderService calenderService;
    // 일정 추가
    // jwt에서 memberId를 가져와서 해당 유저가 project의 팀원인지 확인 후, 생성 허용
    // 임시로 1로 지정
    @PostMapping
    public ResponseEntity<Object> createCalender(@RequestBody CreateCalenderRequestDto requestDto){
        int memberId = 2; //JWT 대체 & 임시
        boolean result = calenderService.createCalender(memberId, requestDto);
        if(result){
            return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
        }else{
            throw new BaseException(StatusCode.FAIL_CREATE_CALENDER);
        }
    }
    // 일정 상태 수정
    @PutMapping
    public ResponseEntity<Object> updateCalender(@RequestBody CalenderRequestDto calenderRequestDto){
        int memberId = 1; //JWT 대체 & 임시
        boolean result = calenderService.updateCalender(memberId, calenderRequestDto);
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));

    }


}

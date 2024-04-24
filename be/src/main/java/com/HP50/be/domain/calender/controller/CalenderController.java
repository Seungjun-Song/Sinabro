package com.HP50.be.domain.calender.controller;

import com.HP50.be.domain.calender.dto.CalenderRequestDto;
import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;
import com.HP50.be.domain.calender.service.CalenderService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class CalenderController {
    private final CalenderService service;
    // 일정 추가
    // jwt에서 memberId를 가져와서 해당 유저가 project의 팀원인지 확인 후, 생성 허용
    // 임시로 1로 지정
    @PostMapping
    public ResponseEntity<Object> createCalender(@RequestBody CreateCalenderRequestDto requestDto){
        int memberId = 2; //JWT 대체 & 임시
        boolean result = service.createCalender(memberId, requestDto);
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
        boolean result = service.updateCalender(memberId, calenderRequestDto);
        if(result){
            return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
        }else{
            throw new BaseException(StatusCode.FAIL_UPDATE_CALENDER);
        }


    }
    // 일정 삭제
    @DeleteMapping
    public ResponseEntity<Object> deleteCalender(@RequestBody CalenderRequestDto requestDto){
        int memberId = 1; //JWT 대체
        boolean result = service.deleteCalender(memberId, requestDto);
        if(result){
            return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
        }else{
            throw new BaseException(StatusCode.FAIL_DELETE_CALENDER);
        }
    }
    // 프로젝트에서 나의 일정 조회
    @GetMapping
    public ResponseEntity<Object> getMySchedulesInProject(@RequestParam Integer projectId){
        int memberId = 1;//JWT 대체
        List<MyCalenderDto> result = service.getMySchedulesInProject(memberId, projectId);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }

}

package com.HP50.be.domain.calender.controller;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.CalenderRequestDto;
import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;
import com.HP50.be.domain.calender.service.CalenderService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(name = "Calender", description = "일정 관련 API")
@Controller
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class CalenderController {
    private final CalenderService service;
    private final JwtUtil jwtUtil;
    // 일정 추가
    // jwt에서 memberId를 가져와서 해당 유저가 project의 팀원인지 확인 후, 생성 허용
    @PostMapping
    @Operation(summary = "일정 추가")     
    public ResponseEntity<Object> createCalender(@CookieValue (JwtConstants.JWT_HEADER) String token,
                                                 @RequestBody CreateCalenderRequestDto requestDto){
        Integer memberId = jwtUtil.getMemberId(token);
        boolean result = service.createCalender(memberId, requestDto);
        if(result){
            return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
        }else{
            throw new BaseException(StatusCode.FAIL_CREATE_CALENDER);
        }
    }
    // 일정 상태 수정
    @PutMapping
    @Operation(summary = "일정 상태 수정")
    public ResponseEntity<Object> updateCalender(@CookieValue (JwtConstants.JWT_HEADER) String token,
                                                 @RequestBody CalenderRequestDto calenderRequestDto){
        Integer memberId = jwtUtil.getMemberId(token);
        boolean result = service.updateCalender(memberId, calenderRequestDto);
        if(result){
            return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
        }else{
            throw new BaseException(StatusCode.FAIL_UPDATE_CALENDER);
        }


    }
    // 일정 삭제
    @DeleteMapping
    @Operation(summary = "일정 삭제")
    public ResponseEntity<Object> deleteCalender(@CookieValue (JwtConstants.JWT_HEADER) String token,
                                                 @RequestBody CalenderRequestDto requestDto){
        Integer memberId = jwtUtil.getMemberId(token);
        boolean result = service.deleteCalender(memberId, requestDto);
        if(result){
            return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
        }else{
            throw new BaseException(StatusCode.FAIL_DELETE_CALENDER);
        }
    }
    // 프로젝트에서 나의 일정 조회
    @GetMapping
    @Operation(summary = "프로젝트에서 나의 일정 조회")
    public ResponseEntity<Object> getMySchedulesInProject(@CookieValue (JwtConstants.JWT_HEADER) String token,
                                                          @RequestParam Integer projectId){
        Integer memberId = jwtUtil.getMemberId(token);
        List<MyCalenderDto> result = service.getMySchedulesInProject(memberId, projectId);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }
    //나의 모든 일정 조회
    @GetMapping("/my-schedule")
    @Operation(summary = "나의 모든 일정 조회")
    public ResponseEntity<Object> getMySchedules(@CookieValue (JwtConstants.JWT_HEADER) String token){
        Integer memberId = jwtUtil.getMemberId(token);
        List<MyCalenderDto> result = service.getMySchedules(memberId);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }

    //프로젝트 전체 일정 조회
    @GetMapping("/{projectId}")
    @Operation(summary = "프로젝트 전체 일정 조회")
    public ResponseEntity<Object> getProjectSchedules(@PathVariable Integer projectId){
        List<CalenderDto> result = service.getProjectCalender(projectId);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }
}

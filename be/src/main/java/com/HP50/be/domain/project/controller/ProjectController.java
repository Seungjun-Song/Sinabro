package com.HP50.be.domain.project.controller;

import com.HP50.be.domain.project.dto.*;
import com.HP50.be.domain.project.service.ProjectService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService service;
    // 팀 정보 조회
    @GetMapping
    private ResponseEntity<Object> getTeamInfo(@RequestBody ProjectRequestDto requestDto){
        ProjectInfoDto result = service.getTeamInfo(requestDto.getMemberId(), requestDto.getProjectId());
        return ResponseEntity.ok(new BaseResponse<>(result));
    }
    // 프로젝트 생성
    @PostMapping("/projects")
    private ResponseEntity<Object> createProject(@RequestBody ProjectCreateRequestDto requestDto){
        int reader = requestDto.getMemberId();
        boolean project = service.createProject(requestDto);
        if(project){
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));}
        else{
            throw new BaseException(StatusCode.FAIL_CREATE_PROJECT);
        }
    }
    //팀원 추가
    @PostMapping
    private ResponseEntity<Object> addTeammate(@RequestBody TeammateRequestDto requestDto){
        boolean result = service.addTeammate(requestDto);
        if(!result){
            throw new BaseException(StatusCode.FAIL_ADD_TEAMMATE);
        }
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }
    //팀원 삭제
    @DeleteMapping
    private ResponseEntity<Object> deleteTeammate(@RequestBody TeammateRequestDto requestDto){
        boolean result = service.deleteTeammate(requestDto);
        if(!result){
            throw new BaseException(StatusCode.FAIL_DELETE_TEAMMATE);
        }
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }
    // 원격 레포 연결
    @PutMapping
    private ResponseEntity<Object> updateRepo(@RequestBody GitRepoRequestDto requestDto){
        boolean result = service.updateRepo(requestDto);
        if(!result){
            throw new BaseException(StatusCode.FAIL_UPDATE_REPO);
        }
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }
}

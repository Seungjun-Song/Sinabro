package com.HP50.be.domain.project.controller;

import com.HP50.be.domain.project.dto.*;
import com.HP50.be.domain.project.service.ProjectService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService service;
    private final JwtUtil jwtUtil;
    // 팀 정보 조회
    @GetMapping
    public ResponseEntity<Object> getTeamInfo(@RequestParam Integer projectId){
        //header처리 될 때 까지 memberId임시로 1 들어감
        ProjectInfoDto result = service.getTeamInfo(1, projectId);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }
    // 프로젝트 생성
    @PostMapping("/projects")
    public ResponseEntity<Object> createProject(@CookieValue (JwtConstants.JWT_HEADER) String token,
                                                @RequestBody ProjectCreateRequestDto requestDto
    ){
        // 생성한 사람이 리더
        Integer reader = jwtUtil.getMemberId(token);
        boolean project = service.createProject(requestDto,reader);
        if(project){
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));}
        else{
            throw new BaseException(StatusCode.FAIL_CREATE_PROJECT);
        }
    }
    //팀원 추가
    // 추후 JWT사용할 시 memberId 비교해서 reader아니면 수정 못하도록 해야함.
    @PostMapping
    public ResponseEntity<Object> addTeammate(@RequestBody TeammateRequestDto requestDto){
        boolean result = service.addTeammate(requestDto);
        if(!result){
            throw new BaseException(StatusCode.FAIL_ADD_TEAMMATE);
        }
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }
    //팀원 삭제
    // 추후 JWT사용할 시 memberId 비교해서 reader아니면 수정 못하도록 해야함.
    @DeleteMapping
    public ResponseEntity<Object> deleteTeammate(@RequestBody TeammateRequestDto requestDto){
        boolean result = service.deleteTeammate(requestDto);
        if(!result){
            throw new BaseException(StatusCode.FAIL_DELETE_TEAMMATE);
        }
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }
    // 원격 레포 연결
    // 추후 JWT사용할 시 memberId 비교해서 reader아니면 수정 못하도록 해야함.
    @PutMapping
    public ResponseEntity<Object> updateRepo(@RequestBody GitRepoRequestDto requestDto){
        boolean result = service.updateRepo(requestDto);
        if(!result){
            throw new BaseException(StatusCode.FAIL_UPDATE_REPO);
        }
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }

    // 프로젝트 입장
    @PostMapping("/projects/enter")
    public ResponseEntity<Object> enterProject(@CookieValue(JwtConstants.JWT_HEADER) String token, @RequestBody ProjectEnterRequestDto projectEnterRequestDto) {
        ProjectEnterDto projectEnterDto = service.enterProject(token, projectEnterRequestDto);

        return ResponseEntity.ok(new BaseResponse<>(projectEnterDto));
    }

    // 프로젝트 퇴장
    @PostMapping("/projects/exit")
    public ResponseEntity<Object> exitProject(@CookieValue(JwtConstants.JWT_HEADER) String token) {
        service.exitProject(token);

        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }

    // 다크 모드
    @PostMapping("/projects/darkMode")
    public ResponseEntity<Object> projectDarkMode(@CookieValue(JwtConstants.JWT_HEADER) String token) {
        service.projectDarkMode(token);

        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }

}

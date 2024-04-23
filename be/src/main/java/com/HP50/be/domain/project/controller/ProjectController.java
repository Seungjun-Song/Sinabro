package com.HP50.be.domain.project.controller;

import com.HP50.be.domain.project.dto.ProjectInfoDto;
import com.HP50.be.domain.project.dto.ProjectInfoRequestDto;
import com.HP50.be.domain.project.service.ProjectService;
import com.HP50.be.global.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/teams")
public class ProjectController {
    private ProjectService service;
    @GetMapping
    private ResponseEntity<Object> getTeamInfo(ProjectInfoRequestDto requestDto){
        ProjectInfoDto result = service.getTeamInfo(requestDto.getMemberId(), requestDto.getProjectId());

        //ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
        return ResponseEntity.ok(new BaseResponse<>(result));
    }

}

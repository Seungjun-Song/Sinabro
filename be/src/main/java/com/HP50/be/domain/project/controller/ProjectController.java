package com.HP50.be.domain.project.controller;

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
    @GetMapping
    private ResponseEntity<Object> getTeamInfo(){
        //ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
        return ResponseEntity.ok(new BaseResponse<>(null));
    }

}

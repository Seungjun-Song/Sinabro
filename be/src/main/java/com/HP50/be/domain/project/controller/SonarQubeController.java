package com.HP50.be.domain.project.controller;

import com.HP50.be.domain.project.dto.SonarRequestDto;
import com.HP50.be.domain.project.service.SonarQubeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@RequiredArgsConstructor
public class SonarQubeController {
    private final SonarQubeService sonarQubeService;
    /**
        정적 분석
     */
    @PostMapping("/scan")
    public ResponseEntity<Object> triggerSonarScan(
            @RequestBody SonarRequestDto dto) {
        sonarQubeService.executeSonarScanner(dto.getProjectId());
        return null;
    }
}

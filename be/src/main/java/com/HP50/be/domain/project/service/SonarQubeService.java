package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.SonarQubeResultDto;
import com.HP50.be.domain.project.dto.SonarRequestDto;
import com.google.gson.JsonObject;
import com.jcraft.jsch.Session;

import java.util.List;

public interface SonarQubeService {
    void executeSonarScanner(Integer projectId,String folderName);
    SonarQubeResultDto getResult(Integer projectId, Integer pageNumber, JsonObject jsonObject,Integer effortTotal,Integer openTotal);
    void changeIssuesStatus(String issues,String doTransition);
}

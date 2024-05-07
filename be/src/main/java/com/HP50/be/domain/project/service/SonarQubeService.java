package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.SonarRequestDto;
import com.jcraft.jsch.Session;
public interface SonarQubeService {
    void executeSonarScanner(Integer projectId,String folderName);
}

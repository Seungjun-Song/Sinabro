package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.ProjectInfoDto;

public interface ProjectService {
    public ProjectInfoDto getTeamInfo(int memberId, int projectId);
}

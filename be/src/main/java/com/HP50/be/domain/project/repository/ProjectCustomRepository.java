package com.HP50.be.domain.project.repository;

import com.HP50.be.domain.project.dto.ProjectInfoDto;

public interface ProjectCustomRepository {
    public ProjectInfoDto getTeamInfo(int projectId, int memberId);
}

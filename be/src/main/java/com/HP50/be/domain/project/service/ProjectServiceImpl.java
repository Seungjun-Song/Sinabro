package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.ProjectInfoDto;
import com.HP50.be.domain.project.repository.ProjectCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService{
    private final ProjectCustomRepository projectCustomRepository;
    @Override
    public ProjectInfoDto getTeamInfo(int memberId, int projectId) {
        return projectCustomRepository.getTeamInfo(projectId,memberId);
    }
}

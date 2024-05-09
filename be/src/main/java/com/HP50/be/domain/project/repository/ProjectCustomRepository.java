package com.HP50.be.domain.project.repository;

import com.HP50.be.domain.project.dto.ProjectInfoDto;
import com.HP50.be.domain.project.entity.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ProjectCustomRepository {
    ProjectInfoDto getTeamInfo(int projectId);
    //프로젝트 멤버인지 확인
    boolean isTeammate(int memberId,int projectId);
    Slice<Project> findProjectSliceSix(Pageable pageable);

}

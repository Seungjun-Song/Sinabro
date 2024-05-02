package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.GitRepoRequestDto;
import com.HP50.be.domain.project.dto.ProjectCreateRequestDto;
import com.HP50.be.domain.project.dto.ProjectInfoDto;
import com.HP50.be.domain.project.dto.TeammateRequestDto;

public interface ProjectService {
    // 프로젝트 정보 확인
    public ProjectInfoDto getTeamInfo(int memberId, int projectId);
    // 프로젝트 생성
    public boolean createProject(ProjectCreateRequestDto requestDto);
    // 팀원 추가
    public boolean addTeammate(TeammateRequestDto requestDto);
    // 팀원 삭제
    public boolean deleteTeammate(TeammateRequestDto requestDto);
    // 원격 레포 연결
    public boolean updateRepo(GitRepoRequestDto requestDto);
}

package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.*;

import java.util.List;

public interface ProjectService {
    // 프로젝트 정보 확인
    ProjectInfoDto getTeamInfo(int memberId);
    // 프로젝트 생성
    boolean createProject(ProjectCreateRequestDto requestDto, int reader);
    // 팀원 추가
    boolean addTeammate(TeammateRequestDto requestDto);
    // 팀원 삭제
    boolean deleteTeammate(TeammateRequestDto requestDto);
    // 원격 레포 연결
    boolean updateRepo(GitRepoRequestDto requestDto);
    // 프로젝트 입장
    ProjectEnterDto enterProject(String token, ProjectEnterRequestDto projectEnterRequestDto);
    // 프로젝트 퇴장
    void exitProject(String token);
    // 프로젝트 다크모드
    String projectDarkMode(String token);
    // 프로젝트 피드백 초대
    String getFeedbackUrl(Integer memberId);

    List<ProjectListResponseDto> getProjectListInMember(String token);

    ProjectCompletedPaginationResponseDto findProjectSliceSix(int page);

    List<ProjectTechStackDto> getProjectTechStacks(Integer projectId);
}

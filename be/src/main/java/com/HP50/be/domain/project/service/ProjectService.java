package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.*;
import com.HP50.be.domain.project.entity.Project;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {
    // 프로젝트 정보 확인
    ProjectInfoDto getTeamInfo(int memberId, int projectId);
    // 프로젝트 생성
    boolean createProject(ProjectCreateRequestDto requestDto, int reader);
    // 팀원 추가
    boolean addTeammate(TeammateRequestDto requestDto);
    // 팀원 삭제
    boolean deleteTeammate(TeammateRequestDto requestDto);
    // 원격 레포 연결
    boolean updateRepo(GitRepoRequestDto requestDto);
    // 프로젝트 입장
    ProjectEnterDto enterProject();

    ResponseEntity<?> getProjectListInMember(String token);
}

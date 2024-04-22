package com.HP50.be.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProjectInfoDto {
    //소분류
    private Integer status; // 진행중, 완료
    // 프로젝트 명
    private String projectName;
    // 프로젝트 소개
    private String projectInfo;
    // 프로젝트 사진
    private String projectImg;
    // 프로젝트 레포
    private String projectRepo;
    // 생성 일시
    private LocalDateTime createdDttm;
    // 완료 일시
    private LocalDateTime endDttm;
    //팀 리스트
    List<TeammateInfo> teammateInfoList;

    public ProjectInfoDto(Integer status, String projectName, String projectInfo, String projectImg, String projectRepo, LocalDateTime createdDttm, LocalDateTime updatedDttm, LocalDateTime endDttm) {
        this.status = status;
        this.projectName = projectName;
        this.projectInfo = projectInfo;
        this.projectImg = projectImg;
        this.projectRepo = projectRepo;
        this.createdDttm = createdDttm;
        this.endDttm = endDttm;
        this.teammateInfoList = new ArrayList<>();
    }

}

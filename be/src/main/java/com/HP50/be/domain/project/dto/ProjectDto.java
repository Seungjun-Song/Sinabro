package com.HP50.be.domain.project.dto;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.project.entity.Project;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Setter
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    @Schema(description = "나의 프로젝트 이름", example = "HP50의 성공하기 프로젝트")
    private String projectName;
    
    @Schema(description = "프로젝트의 설명", example = "우리팀이 세상에서 제일 개발 잘한다를 목표로 하고 있습니다.")
    private String projectInfo;

    @Schema(description = "우리 프로젝트의 대표 이미지 - 썸네일", example = "WeAreBest.jpg")
    private String projectImg;

    @Schema(description = "우리 프로젝트의 깃허브 Repo", example = "https://github.com/jongkookE/WeAreBest")
    private String projectRepo;

    @Schema(description = "우리 프로젝트가 사용하고 있는 DB Port", example = "3306")
    private Integer projectDbPort; //안쓰는거 하나 리턴

    private SubCategory subCategory;
    public Project toEntity(ProjectDto projectDto){
        return Project.builder()
                .subCategory(projectDto.subCategory)
                .projectName(projectDto.projectName)
                .projectInfo(projectDto.projectInfo)
                .projectImg(projectDto.projectImg)
                .projectRepo(projectDto.projectRepo)
                .projectDbPort(projectDto.projectDbPort)
                .build();
    }
}

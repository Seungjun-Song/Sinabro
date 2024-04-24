package com.HP50.be.domain.project.dto;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.project.entity.Project;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Setter
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private String projectName;
    private String projectInfo;
    private String projectImg;
    private String projectRepo;
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

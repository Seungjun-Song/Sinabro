package com.HP50.be.domain.project.dto;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.project.entity.Project;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectListResponseDto {
    private Integer projectId;
    private String projectName;
    private String projectInfo;
    private String projectImg;
    private String projectRepo;
    private SubCategory subCategory;
}

package com.HP50.be.domain.project.dto;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.project.entity.Project;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Builder
public class ProjectListResponseDto {
    @Schema(example = "1")
    private Integer projectId;

    @Schema(example = "시나브로")
    private String projectName;

    @Schema(example = "초보 개발자들의 원격 개발환경 제공 프로젝트")
    private String projectInfo;

    @Schema(example = "https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.png")
    private String projectImg;

    @Schema(example = "https://github.com/JongKookE/GGAME/tree/master")
    private String projectRepo;

    @Schema(example = "503")
    private SubCategory subCategory;
}

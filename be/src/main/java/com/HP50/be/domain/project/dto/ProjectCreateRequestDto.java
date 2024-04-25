package com.HP50.be.domain.project.dto;

import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCreateRequestDto {
    Integer memberId;
    String projectName;
    String projectInfo;
    String projectImg;
    String projectRepo;
    List<TechStackSimpleDto> memberList;
}

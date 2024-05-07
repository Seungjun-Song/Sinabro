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
    String projectName;
    String projectInfo;
//    String projectImg; Multipart로 받아야함.
    String projectRepo;
    List<TechStackSimpleDto> memberList;
}

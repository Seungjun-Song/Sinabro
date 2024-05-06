package com.HP50.be.domain.member.dto;

import com.HP50.be.domain.project.dto.ProjectDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProfileResponseDto {
    private Integer memberId;
    private String nickname;
    private String memberGit;
    private String memberImg;
    private String memberEmail;
    private String memberJob;
    private List<TechStackResponseDto> techStacks;
    private List<ProjectDto> projects;
}

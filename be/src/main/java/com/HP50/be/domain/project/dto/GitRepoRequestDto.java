package com.HP50.be.domain.project.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GitRepoRequestDto {
    Integer projectId;
    String projectRepo;
}

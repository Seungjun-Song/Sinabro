package com.HP50.be.domain.project.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class ProjectRequestDto {
    int memberId;
    int projectId;
}

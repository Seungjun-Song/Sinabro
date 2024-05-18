package com.HP50.be.domain.project.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectFeedbackDto {
    private String url;
    private String theme;
}

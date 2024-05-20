package com.HP50.be.domain.project.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectFeedbackDto {
    private String feedbackUrl;
    private String theme;
}

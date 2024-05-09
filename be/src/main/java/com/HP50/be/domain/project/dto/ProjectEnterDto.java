package com.HP50.be.domain.project.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectEnterDto {
    private String url;
    private String previewUrl;
    private Integer dbPort;
}

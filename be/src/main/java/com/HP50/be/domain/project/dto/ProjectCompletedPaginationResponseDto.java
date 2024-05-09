package com.HP50.be.domain.project.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectCompletedPaginationResponseDto {
    private boolean hasNext;
    private List<ProjectListResponseDto> projectListResponseDtos;

}

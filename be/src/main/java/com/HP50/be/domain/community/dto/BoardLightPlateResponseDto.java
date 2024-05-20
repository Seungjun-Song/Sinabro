package com.HP50.be.domain.community.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardLightPlateResponseDto {
    private Integer boardId;
    private String projectName;
    private String boardTitle;
}

package com.HP50.be.domain.community.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardFilterRequestDto {
    private Integer subCategoryBoard;
    private Integer subCategoryCalender;
    // 100 = 프론트 , 200 = 백, 300 = 풀스택, 0 = 모두 다
    private Integer categoryJob;
    private String searchTitle;
}

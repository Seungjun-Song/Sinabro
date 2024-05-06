package com.HP50.be.domain.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TechStackSaveRequestDto {
    private Integer memberId;
    private Integer subCategoryId;
}

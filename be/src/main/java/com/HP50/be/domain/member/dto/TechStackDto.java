package com.HP50.be.domain.member.dto;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TechStackDto {
    private Integer techStackId;
    private Member member;
    private SubCategory subCategory;
    private String subCategoryName;
}

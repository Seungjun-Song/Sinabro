package com.HP50.be.domain.community.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class CommentDto {
    private Integer memberId;
    private String memberName;
    private String memberImg;
    private String commentContent;
    private LocalDate createdDttm;
    private LocalDate updatedDttm;

}

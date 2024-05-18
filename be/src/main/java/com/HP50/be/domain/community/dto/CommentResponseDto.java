package com.HP50.be.domain.community.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponseDto {
    @Schema(example = "94429120")
    private Integer memberId;

    @Schema(example = "1")
    private Integer commentId;

    @Schema(example = "비밀 댓글입니다.")
    private String commentContent;

    @Schema(example= "jongkookE")
    private String memberName;

    @Schema(example = "https://avatars.githubusercontent.com/u/94429120?v=4")
    private String memberImg;

    @Schema(example = "2024-05-01 01:05:29.917272")
    private LocalDateTime createdDttm;

}

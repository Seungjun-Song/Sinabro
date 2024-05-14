package com.HP50.be.domain.community.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class CommentRequestDto {
    @Schema(example = "94429120")
    private Integer memberId;

    @Schema(example = "비밀 댓글입니다.")
    private String commentContent;

    @Schema(example = "1")
    private Integer boardId;

    @Schema(example = "2024-05-01 01:05:29.917272")
    private LocalDate createdDttm;

    @Schema(example = "2024-05-07 17:52:40.918332")
    private LocalDate updatedDttm;
}

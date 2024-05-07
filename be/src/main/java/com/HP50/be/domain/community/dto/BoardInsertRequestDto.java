package com.HP50.be.domain.community.dto;

import com.HP50.be.domain.code.dto.TagDto;
import com.google.gson.Gson;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BoardInsertRequestDto {

    @Schema(example = "리액트 사용 가능한 프론트엔드 개발자 구합니다.")
    private String boardTitle;

    @Schema(example = "저희는 백엔드 3명에 프론트 2명입니다 한분만 와주세요")
    private String boardContent;

    @Schema(example = "https://firebase.com/v4/jbbbejqhuabsaskdb.jpg")
    private String boardImg;

    @Schema(description = "피드백 주세요 일 경우에만 게시", example = "https://k10e103.p.ssafy.io/my-code-server")
    private String projectLink;

    @Schema(description = "팀 구해요 일 경우는 null", example = "11")
    private Integer projectId;

    @Schema(example = "팀 구해요")
    private Integer subCategoryId;

    private List<TagDto> boardTag;

}

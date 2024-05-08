package com.HP50.be.domain.community.dto;

import com.HP50.be.domain.code.dto.TagDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Data
public class BoardInsertRequestDto {

    @Schema(example = "1", description = "boardId를 전송 받으면 update\n" +
                                            "전송받지 않는다면 save")
    private Integer boardId;

    @Schema(example = "리액트 사용 가능한 프론트엔드 개발자 구합니다.")
    private String boardTitle;

    @Schema(example = "저희는 백엔드 3명에 프론트 2명입니다 한분만 와주세요")
    private String boardContent;

    @Schema(example = "https://firebase.com/v4/jbbbejqhuabsaskdb.jpg")
    private String boardImg;

    @Schema(description = "피드백 주세요 일 경우에만 게시", example = "https://k10e103.p.ssafy.io/my-code-server")
    private String projectLink;

    @Schema(description = "팀 구해요 일 경우는 null", example = "11")
    private Optional<Integer> projectId;

    @Schema(example = "401", description = "401 = 팀원 구해요" +
            "402 = 팀 원해요" +
            "403 = 피드백 원해요")
    private Integer subCategoryId;

    @Schema(example = "2")
    private Integer requiredbackEnd;

    @Schema(example = "1")
    private Integer requiredFrontEnd;

    @Schema(example = "0")
    private Integer requiredFullStack;

    private List<TagDto> boardTag;

}

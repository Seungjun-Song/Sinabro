package com.HP50.be.domain.community.dto;

import com.HP50.be.domain.code.dto.SubCategoryResponseDto;
import com.HP50.be.domain.code.dto.TagDto;
import com.HP50.be.domain.code.entity.SubCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Data
@Builder
public class BoardDetailResponseDto {
    @Schema(name = "게시판의 고유 번호", example = "127")
    private Integer boardId;

    @Schema(example = "94429120")
    private Integer memberId;

    @Schema(name = "게시글을 작성한 멤버의 이름", example = "jongkookE")
    private String memberName;

    @Schema(name = "게시글의 제목", example = "리액트 사용 가능한 프론트엔드 개발자 구합니다.")
    private String boardTitle;

    @Schema(name = "게시글의 내용", example = "나랏말싸미 듕귁에 달아문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아 내 이랄 윙하야 어엿비너겨 새로 스믈 여듫 짜랄 맹가노니사람마다 해여 수비니겨 날로 쑤메 뻔한킈 하고져 할따라미니라")
    private String boardContent;

    @Schema(example = "1")
    private Integer projectId;

    @Schema(name = "0 이면 완료, 1이면 진행 중", example = "1")
    private boolean communityProgress;

    @Schema(name = "최초로 만들어진 시간", example = "2024-05-02 12:17:04.843837")
    private LocalDateTime createdDttm;

    @Schema(name = "마지막으로 수정된 시간", example = "2024-05-03 17:57:46.782102")
    private LocalDateTime updatedDttm;

    @Schema(example = "2")
    private Optional<Integer> requiredBackEnd;

    @Schema(example = "1")
    private Optional<Integer> requiredFrontEnd;

    @Schema(example = "0")
    private Optional<Integer> recruitedPeopleBackEnd;

    @Schema(example = "0")
    private Optional<Integer> recruitedPeopleFrontEnd;

    private SubCategory subCategory;

    private List<TagDto> tagDtos;

    private List<CommentResponseDto> commentResponseDtos;
}

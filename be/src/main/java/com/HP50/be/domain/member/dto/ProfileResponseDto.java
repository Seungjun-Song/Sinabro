package com.HP50.be.domain.member.dto;

import com.HP50.be.domain.memoryGraph.dto.MemberForGraphDto;
import com.HP50.be.domain.project.dto.ProjectDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProfileResponseDto {
    @Schema(description = "유저의 고유 번호 - 깃허브의 고유 번호와 동일", example = "94429120")
    private Integer memberId;

    @Schema(description = "유저의 이름 - 깃허브의 이름과 동일", example = "jongkookE")
    private String nickname;

    @Schema(description = "유저의 깃허브 URL", example = "https://github.com/JongKookE")
    private String memberGit;

    @Schema(description = "유저의 프로필 이미지 - 깃허브 프로필 이미지와 동일", example = "https://avatars.githubusercontent.com/u/64572911?v=4")
    private String memberImg;

    @Schema(description = "유저의 이메일 - 깃허브 로그인 이메일이 아닌 자신의 프로필에 등록한 이메일", example = "whdrnrdl789@naver.com")
    private String memberEmail;

    @Schema(description = "회원가입시 자신이 등록한 나의 직무", example = "백엔드")
    private String memberJob;

    private List<TechStackResponseDto> techStacks;
    private List<ProjectDto> projects;
    private MemberForGraphDto graphDto;
}

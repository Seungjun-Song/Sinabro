package com.HP50.be.domain.member.controller;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.service.CategoryService;
import com.HP50.be.domain.member.dto.ProfileResponseDto;
import com.HP50.be.domain.member.dto.SearchMemberResponseDto;
import com.HP50.be.domain.member.dto.TechStackDeleteRequestDto;
import com.HP50.be.domain.member.dto.TechStackSaveRequestDto;
import com.HP50.be.domain.member.service.MemberService;
import com.HP50.be.domain.member.service.TechStackService;
import com.HP50.be.domain.project.dto.ProjectListResponseDto;
import com.HP50.be.domain.project.service.ProjectService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.jwt.JwtConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Member", description = "Member 관련 API 모음입니다.")
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final CategoryService categoryService;
    private final TechStackService techStackService;
    private final ProjectService projectService;
    // 유저 검색
    @GetMapping
    public ResponseEntity<Object> searchMember(@RequestParam String keyword,
                                             @RequestParam Integer page) {
        SearchMemberResponseDto result = memberService.searchMember(keyword, page);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }

    @Operation(
            summary = "멤버의 직무 수정",
            description = "마이페이지에 보여지는 자신의 직무를 수정합니다. (프론트엔드, 백엔드, 풀스택)"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "100", description = "성공하였습니다."),
            @ApiResponse(responseCode = "203", description = "알수없는 에러가 발생했습니다.")
    })
    @PutMapping
    public ResponseEntity<BaseResponse<StatusCode>> updateCategoryInMember(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                                                  @RequestBody CategoryRequestDto dto){
        categoryService.savePersonalDuty(token, dto);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "멤버의 기술스택 저장")
    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> saveTechStack(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                           @RequestBody List<TechStackSaveRequestDto> dtos){
        techStackService.save(token, dtos);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "멤버의 기술스택 삭제", description = "쿠키 전달없이 techStackId만 전달해주시면 됩니다.")
    @DeleteMapping
    public ResponseEntity<BaseResponse<StatusCode>> deleteTechStack(@RequestBody List<TechStackDeleteRequestDto> techStackIds){
        techStackService.delete(techStackIds);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "멤버의 프로필 조회", description = "자기자신 및 다른사람의 프로필 조회가능")
    @GetMapping("/{memberId}")
    public ResponseEntity<BaseResponse<ProfileResponseDto>> findMemberProfile(@PathVariable Integer memberId){
        return ResponseEntity.ok().body(new BaseResponse<>(memberService.findMemberProfile(memberId)));
    }

    @Operation(summary = "자신의 모든 프로젝트 나열")
    @GetMapping("/projects")
    public ResponseEntity<BaseResponse<List<ProjectListResponseDto>>> getMyProjectList(@CookieValue(JwtConstants.JWT_HEADER) String token){
        return ResponseEntity.ok().body(new BaseResponse<>(projectService.getProjectListInMember(token)));
    }

    @Operation(summary = "멤버 삭제")
    @DeleteMapping("/{memberId}")
    public ResponseEntity<BaseResponse<StatusCode>> deleteComment(@PathVariable Integer memberId){
        memberService.deleteMember(memberId);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "프로필 이미지 변경")
    @PostMapping("/images")
    public ResponseEntity<BaseResponse<StatusCode>> updateProfileImage(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                                                       @RequestParam("img") String img){
        memberService.updateProfileImage(token, img);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }
}

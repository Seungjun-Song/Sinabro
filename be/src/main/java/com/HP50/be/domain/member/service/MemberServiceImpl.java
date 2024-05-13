package com.HP50.be.domain.member.service;

import com.HP50.be.domain.member.dto.ProfileResponseDto;
import com.HP50.be.domain.member.dto.SearchMemberResponseDto;
import com.HP50.be.domain.member.dto.SearchMemberSimpleInfoDto;
import com.HP50.be.domain.member.dto.TechStackResponseDto;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberCustomRepository;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.memoryGraph.dto.MemoDto;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import com.HP50.be.domain.memoryGraph.service.MemoService;
import com.HP50.be.domain.project.dto.ProjectDto;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberCustomRepository memberCustomRepository;
    private final MemberRepository memberRepository;
    private final MemoService memoService;
    private final JwtUtil jwtUtil;
    @Override
    public SearchMemberResponseDto searchMember(String keyword, int page) {
        //pageable 객체 생성
        PageRequest pageRequest = PageRequest.of(page, 20);
        Slice<Member> members = memberCustomRepository.searchMember(keyword, pageRequest);
        List<SearchMemberSimpleInfoDto> result = members.stream()
                .map(member -> new SearchMemberSimpleInfoDto(
                        member.getMemberId(),
                        member.getMemberName(),
                        member.getMemberImg()
                ))
                .toList();
        Boolean hasNext = members.hasNext();
        Integer number = members.getNumber();
        return SearchMemberResponseDto.builder()
                .searchList(result)
                .hasNext(hasNext)
                .page(number)
                .build();
    }

    @Override
    public ProfileResponseDto findMemberProfile(Integer memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        List<TechStackResponseDto> techStackResponseDtos =  member.getTechStacks().stream()
                .map(techStack -> TechStackResponseDto.builder()
                        .techStackId(techStack.getTechStackId())
                        .subCategoryId(techStack.getSubCategory().getSubCategoryId())
                        .subCategoryName(techStack.getSubCategoryName())
                        .build())
                .toList();

        List<ProjectDto> projectDtos = member.getTeammates().stream()
                .map(project -> ProjectDto.builder()
                        .projectName(project.getProject().getProjectName())
                        .projectInfo(project.getProject().getProjectInfo())
                        .projectImg(project.getProject().getProjectImg())
                        .projectRepo(project.getProject().getProjectRepo())
                        .subCategory(project.getProject().getSubCategory())
                        .build())
                .toList();

        return ProfileResponseDto.builder()
                .memberId(memberId)
                .nickname(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberImg(member.getMemberImg())
                .memberGit(member.getMemberGit())
                .memberJob(member.getCategory().getCategoryName())
                .techStacks(techStackResponseDtos)
                .projects(projectDtos)
                .graphDto(this.memoService.findMemoByMemberId(memberId))
                .build();
    }

    @Override
    public Member findById(Integer memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
    }

    @Override
    public void deleteMember(Integer memberId) {
        memberRepository.deleteById(memberId);
    }

    @Override
    public void updateProfileImage(String token, String newImage) {

        memberCustomRepository.updateProfileImage(jwtUtil.getMemberId(token), newImage);
    }
}

package com.HP50.be.domain.community.service;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.service.SubCategoryService;
import com.HP50.be.domain.community.dto.BoardInsertRequestDto;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.community.repository.BoardRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.domain.project.service.ProjectService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final SubCategoryService subCategoryService;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    @Override
    public ResponseEntity<?> insertBoard(String token, BoardInsertRequestDto boardInsertRequestDto) {
        Integer memberId = jwtUtil.getMemberId(token);

        SubCategory subCategory = subCategoryService.findById(boardInsertRequestDto.getProjectId());
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        Project project = projectRepository.findById(boardInsertRequestDto.getProjectId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));

        String toJson = new Gson().toJson(boardInsertRequestDto.getBoardTag()) ;

        Board board = Board.builder()
                .member(member)
                .boardTitle(boardInsertRequestDto.getBoardTitle())
                .boardContent(boardInsertRequestDto.getBoardContent())
                .boardTag(toJson)
                .boardImg(boardInsertRequestDto.getBoardImg())
                .communityProgress(true)
                .project(project)
                .subCategory(subCategory)
                .build();

        boardRepository.save(board);

        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }
}

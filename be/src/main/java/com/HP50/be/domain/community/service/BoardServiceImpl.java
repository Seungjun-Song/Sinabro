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

        Board board = this.transferToBoard(token, boardInsertRequestDto);
        // 기존에 존재하는 엔티티라면 update
        // 존재하지 않았던 엔티티라면 save
        boardRepository.save(board);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    public Board transferToBoard(String token, BoardInsertRequestDto boardInsertRequestDto){
        Integer memberId = jwtUtil.getMemberId(token);
        // board 가 0 이라면 save
        // 0 이 아니라면 update 분기처리
        Integer boardId = boardInsertRequestDto.getBoardId();
        SubCategory subCategory = subCategoryService.findById(boardInsertRequestDto.getProjectId());
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        Project project = projectRepository.findById(boardInsertRequestDto.getProjectId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));

        String toJson = new Gson().toJson(boardInsertRequestDto.getBoardTag()) ;

        // builder 패턴 진행 중에 boardId 를 넣어주고와 넣어주지 않음의 차이
        if(boardId == 0) return Board.builder()
                .member(member)
                .boardTitle(boardInsertRequestDto.getBoardTitle())
                .boardContent(boardInsertRequestDto.getBoardContent())
                .boardTag(toJson)
                .boardImg(boardInsertRequestDto.getBoardImg())
                .communityProgress(true)
                .project(project)
                .subCategory(subCategory)
                .build();

        else return Board.builder()
                .boardId(boardInsertRequestDto.getBoardId())
                .member(member)
                .boardTitle(boardInsertRequestDto.getBoardTitle())
                .boardContent(boardInsertRequestDto.getBoardContent())
                .boardTag(toJson)
                .boardImg(boardInsertRequestDto.getBoardImg())
                .communityProgress(true)
                .project(project)
                .subCategory(subCategory)
                .build();

    }

}

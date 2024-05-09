package com.HP50.be.domain.community.service;

import com.HP50.be.domain.code.dto.SubCategoryResponseDto;
import com.HP50.be.domain.code.dto.TagDto;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.service.SubCategoryService;
import com.HP50.be.domain.community.dto.*;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.community.repository.BoardCustomRepository;
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
import com.google.gson.reflect.TypeToken;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final SubCategoryService subCategoryService;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final BoardCustomRepository boardCustomRepository;
    private final JwtUtil jwtUtil;

    @Override
    public void insertBoard(String token, BoardInsertRequestDto boardInsertRequestDto) {

        Board board = this.transferToBoard(token, boardInsertRequestDto);
        // 기존에 존재하는 엔티티라면 update
        // 존재하지 않았던 엔티티라면 save
        boardRepository.save(board);
    }

    @Override
    public BoardDetailResponseDto findBoardDetail(Integer boardId) {
        Board board = this.findById(boardId);

        // 문자열로 넘어온 json 처럼 생긴 데이터를 TagDto로 변환하는 로직
        TagDto[] tagDtoArray = new Gson().fromJson(board.getBoardTag(), TagDto[].class);
        List<TagDto> tagDtoList = List.of(tagDtoArray);

        BoardDetailResponseDto boardDetailResponseDto = BoardDetailResponseDto.builder()
                .boardId(board.getBoardId())
                .memberId(board.getMember().getMemberId())
                .memberName(board.getMember().getMemberName())
                .boardTitle(board.getBoardTitle())
                .boardContent(board.getBoardContent())
                .subCategory(board.getSubCategory())
                .communityProgress(board.isCommunityProgress())
                .requiredBackEnd(Optional.ofNullable(board.getRequiredPeopleBackEnd()))
                .requiredFrontEnd(Optional.ofNullable(board.getRequiredPeopleFrontEnd()))
                .recruitedPeopleBackEnd(Optional.ofNullable(board.getRecruitedPeopleBackEnd()))
                .recruitedPeopleFrontEnd(Optional.ofNullable(board.getRecruitedPeopleBackEnd()))
                .tagDtos(tagDtoList)
                .createdDttm(board.getCreatedDttm())
                .updatedDttm(board.getUpdatedDttm())
                .build();

        if((board.getProject() != null)) {
            boardDetailResponseDto.setBoardId(board.getProject().getProjectId());
        }

        return boardDetailResponseDto;
    }

    @Override
    public BoardPaginationResponseDto findByConditions(Integer catBoard,
                                                       Integer calCalender,
                                                       Integer catJob,
                                                       String keyword,
                                                       int page) {
        PageRequest pageRequest = PageRequest.of(page, 10);

        Slice<Board> boards = boardCustomRepository.findByConditions(catBoard, calCalender, catJob, keyword, pageRequest);
        List<BoardListResponseDto> boardListResponseDtos = new ArrayList<>();

        for(Board board: boards){
            List<TagDto> tagDtos = Arrays.stream(new Gson().fromJson(board.getBoardTag(), TagDto[].class)).toList();
            BoardListResponseDto boardListResponseDto = BoardListResponseDto.builder()
                    .boardId(board.getBoardId())
                    .memberName(board.getMember().getMemberName())
                    .boardTitle(board.getBoardTitle())
                    .boardContent(board.getBoardContent())
                    .tagDtos(tagDtos)
                    .communityProgress(board.isCommunityProgress())
                    .recruitedPeopleFrontEnd(Optional.ofNullable(board.getRecruitedPeopleFrontEnd()))
                    .recruitedPeopleBackEnd(Optional.ofNullable(board.getRecruitedPeopleBackEnd()))
                    .requiredPeopleFrontEnd(Optional.ofNullable(board.getRequiredPeopleFrontEnd()))
                    .requiredPeopleBackEnd(Optional.ofNullable(board.getRequiredPeopleBackEnd()))
                    .createdDttm(board.getCreatedDttm())
                    .updatedDttm(board.getUpdatedDttm())
                    .build();
            boardListResponseDtos.add(boardListResponseDto);
        }

        BoardPaginationResponseDto boardPaginationResponseDto = BoardPaginationResponseDto.builder()
                .hasNext(boards.hasNext())
                .boardListResponseDto(boardListResponseDtos)
                .build();

        return boardPaginationResponseDto;
    }

    @Override
    public Board findById(Integer boardId) {
        return boardRepository.findById(boardId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_BOARD));
    }

    @Override
    public void deleteBoard(Integer boardId) {
        boardRepository.deleteById(boardId);
    }

    public Board transferToBoard(String token, BoardInsertRequestDto boardInsertRequestDto){
        Integer memberId = jwtUtil.getMemberId(token);
        // board 가 0 이라면 save
        // 0 이 아니라면 update 분기처리
        Optional<Integer> projectId =  boardInsertRequestDto.getProjectId();

        Integer boardId = boardInsertRequestDto.getBoardId();
        SubCategory subCategory = subCategoryService.findById(boardInsertRequestDto.getSubCategoryId());
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));


        String toJson = new Gson().toJson(boardInsertRequestDto.getBoardTag());

        Board board = Board.builder()
                .member(member)
                .boardTitle(boardInsertRequestDto.getBoardTitle())
                .boardContent(boardInsertRequestDto.getBoardContent())
                .boardTag(toJson)
                .boardImg(boardInsertRequestDto.getBoardImg())
                .communityProgress(true)
                .subCategory(subCategory)
                .build();


        // null 값이 들어온다면 board 에 저장할때 null 을 저장
        if(boardInsertRequestDto.getRecruitedPeopleBackEnd() != null)
            board.setRecruitedPeopleBackEnd(boardInsertRequestDto.getRecruitedPeopleBackEnd().get());
//            board.setRecruitedPeopleBackEnd(0);

        if(boardInsertRequestDto.getRecruitedPeopleFrontEnd() != null)
            board.setRecruitedPeopleFrontEnd(boardInsertRequestDto.getRecruitedPeopleFrontEnd().get());
//            board.setRecruitedPeopleFrontEnd(0);

        if(boardInsertRequestDto.getRequiredPeopleBackEnd() != null)
            board.setRequiredPeopleBackEnd(boardInsertRequestDto.getRequiredPeopleBackEnd().get());
//            board.setRequiredPeopleBackEnd(0);

        if(boardInsertRequestDto.getRequiredPeopleFrontEnd() != null)
            board.setRequiredPeopleFrontEnd(boardInsertRequestDto.getRequiredPeopleFrontEnd().get());
//            board.setRequiredPeopleFrontEnd(0);



        // NullPointerException 을 방지
        if(projectId != null) {
            Integer pID = projectId.orElse(null);
            Project project = projectRepository.findById(pID).orElseThrow(() -> new BaseException(StatusCode.BAD_REQUEST));
            board.setProject(project);
        }

        // boardId 가 0 이면 새로운 데이터 삽입 아니라면 업데이트
        if(boardId != 0)  board.setBoardId(boardInsertRequestDto.getBoardId());

        return board;
    }

}

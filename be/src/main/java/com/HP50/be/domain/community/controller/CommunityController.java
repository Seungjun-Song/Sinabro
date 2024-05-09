package com.HP50.be.domain.community.controller;

import com.HP50.be.domain.community.dto.*;
import com.HP50.be.domain.community.service.BoardService;
import com.HP50.be.domain.community.service.CommentService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.jwt.JwtConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Community", description = "게시판 관련된 API 모음입니다.")
@RestController
@RequestMapping("/communities")
@RequiredArgsConstructor
public class CommunityController {
    private final BoardService boardService;
    private final CommentService commentService;

    @Operation(summary = "댓글 저장")
    @PostMapping("/comment")
    public ResponseEntity<BaseResponse<StatusCode>> saveComment(@RequestBody CommentRequestDto commentRequestDto){
        return commentService.save(commentRequestDto);
    }
    @Operation(summary = "게시글 저장", description = "boardId = 0 INSERT, 기존에 존재하는 값이면 UPDATE ")
    @ApiResponse(responseCode = "100", description = "성공하였습니다.")
    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> insertBoard(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                                                  @RequestBody BoardInsertRequestDto boardInsertRequestDto){
        return boardService.insertBoard(token, boardInsertRequestDto);
    }

    // 스웨거에 return 형식을 보여주기 위해서는 ? 를 사용하면 안되고 아래와 같이 명시적으로 기입해줘야함
    @Operation(summary = "게시글 가져오기")
    @Parameter(name = "catBoard", example = "401", description = "0이면 필터 X")
    @Parameter(name = "catCalender", example = "501", description = "0이면 필터 X")
    @Parameter(name = "catJob", example = "100", description = "0이면 필터 X")
    @Parameter(name = "keyword", example = "백엔", description = "공백이면 필터 X")
    @GetMapping
    public ResponseEntity<BaseResponse<BoardPaginationResponseDto>> findByConditons(@RequestParam Integer catBoard,
                                                                                    @RequestParam Integer catCalender,
                                                                                    @RequestParam Integer catJob,
                                                                                    @RequestParam String keyword,
                                                                                    @RequestParam int page){
        return ResponseEntity.ok().body(new BaseResponse<>(boardService.findByConditions(catBoard, catCalender, catJob, keyword, page)));
    }

    @Operation(summary = "상세 게시글 조회")
    @GetMapping("/boards/{boardId}")
    public ResponseEntity<BaseResponse<BoardDetailResponseDto>> findBoardDetail(@PathVariable Integer boardId){
        return boardService.findBoardDetail(boardId);
    }

    @Operation(summary = "게시글의 댓글 조회")
    @GetMapping("/comments/{boardId}")
    public ResponseEntity<BaseResponse<List<CommentResponseDto>>> findCommentInBoard(@PathVariable Integer boardId){
        return ResponseEntity.ok().body(new BaseResponse<>(commentService.findCommentInBoard(boardId)));
    }


    @Operation(summary = "게시물 삭제")
    @DeleteMapping("/boards/{boardId}")
    public ResponseEntity<BaseResponse<StatusCode>> deleteBoard(@PathVariable Integer boardId){
        boardService.deleteBoard(boardId);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "댓글 삭제")
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<BaseResponse<StatusCode>> deleteComment(@PathVariable Integer commentId){
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }


}

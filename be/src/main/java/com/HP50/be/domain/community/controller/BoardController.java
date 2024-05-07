package com.HP50.be.domain.community.controller;

import com.HP50.be.domain.community.dto.BoardDetailResponseDto;
import com.HP50.be.domain.community.dto.BoardFilterRequestDto;
import com.HP50.be.domain.community.dto.BoardInsertRequestDto;
import com.HP50.be.domain.community.dto.BoardListResponseDto;
import com.HP50.be.domain.community.service.BoardService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.jwt.JwtConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Board", description = "게시판 관련된 API 모음입니다.")
@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @Operation(summary = "게시글 저장")
    @ApiResponse(responseCode = "100", description = "성공하였습니다.")
    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> insertBoard(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                                                  @RequestBody BoardInsertRequestDto boardInsertRequestDto){
        return boardService.insertBoard(token, boardInsertRequestDto);
    }

    // 스웨거에 return 형식을 보여주기 위해서는 ? 를 사용하면 안되고 아래와 같이 명시적으로 기입해줘야함
    @Operation(summary = "게시글 가져오기")
    @GetMapping
    public ResponseEntity<BaseResponse<List<BoardListResponseDto>>> findByConditons(@RequestBody BoardFilterRequestDto boardFilterRequestDto){
        return boardService.findByConditions(boardFilterRequestDto);
    }

    @Operation(summary = "상세 게시글 조회")
    @GetMapping("/{boardId}")
    public ResponseEntity<BaseResponse<BoardDetailResponseDto>> findBoardDetail(
            @PathVariable Integer boardId
            ){
        return boardService.findBoardDetail(boardId);
    }

}

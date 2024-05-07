package com.HP50.be.domain.community.controller;

import com.HP50.be.domain.community.dto.BoardInsertRequestDto;
import com.HP50.be.domain.community.service.BoardService;
import com.HP50.be.global.jwt.JwtConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Board", description = "게시판 관련된 API 모음입니다.")
@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @Operation(summary = "게시글 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "100", description = "성공하였습니다."),
            @ApiResponse(responseCode = "502", description = "프로젝트가 존재하지 않습니다."),
            @ApiResponse(responseCode = "601", description = "적절한 유저가 아닙니다..")
    })
    @PostMapping
    public ResponseEntity<?> insertBoard(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                         @RequestBody BoardInsertRequestDto boardInsertRequestDto){
        return boardService.insertBoard(token, boardInsertRequestDto);
    }

}

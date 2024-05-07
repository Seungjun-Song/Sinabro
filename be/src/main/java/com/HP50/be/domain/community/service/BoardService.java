package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.BoardFilterRequestDto;
import com.HP50.be.domain.community.dto.BoardInsertRequestDto;
import com.HP50.be.domain.community.dto.BoardListResponseDto;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BoardService {
    ResponseEntity<BaseResponse<StatusCode>> insertBoard(String token, BoardInsertRequestDto boardInsertRequestDto);
    ResponseEntity<?> findBoard(String token, BoardFilterRequestDto boardFilterRequestDto);
    ResponseEntity<BaseResponse<List<BoardListResponseDto>>> findByConditions(BoardFilterRequestDto boardFilterRequestDto);
}

package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.*;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BoardService {
    ResponseEntity<BaseResponse<StatusCode>> insertBoard(String token, BoardInsertRequestDto boardInsertRequestDto);
    ResponseEntity<BaseResponse<BoardDetailResponseDto>> findBoardDetail(Integer boardId);
    BoardPaginationResponseDto findByConditions( Integer catBoard,
                                                 Integer catCalender,
                                                 Integer catJob,
                                                 String keyword,
                                                 int page);
    Board findById(Integer boardId);
}

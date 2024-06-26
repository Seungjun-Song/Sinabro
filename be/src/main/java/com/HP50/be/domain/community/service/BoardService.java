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
    void insertBoard(String token, BoardInsertRequestDto boardInsertRequestDto);
    BoardDetailResponseDto findBoardDetail(Integer boardId);
    BoardPaginationResponseDto findByConditions( Integer catBoard,
                                                 Integer catCalender,
                                                 Integer catJob,
                                                 String keyword,
                                                 int page);
    Board findById(Integer boardId);
    void deleteBoard(Integer boardId);

    List<BoardLightPlateResponseDto> getLightPlateBoards();
}

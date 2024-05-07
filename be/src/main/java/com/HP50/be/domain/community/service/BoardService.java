package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.BoardInsertRequestDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<?> insertBoard(String token, BoardInsertRequestDto boardInsertRequestDto);
}

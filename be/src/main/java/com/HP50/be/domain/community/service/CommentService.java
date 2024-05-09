package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.CommentRequestDto;
import com.HP50.be.domain.community.dto.CommentResponseDto;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
    ResponseEntity<BaseResponse<StatusCode>> save(CommentRequestDto commentRequestDto);
    void deleteComment(Integer commentId);
    List<CommentResponseDto> findCommentInBoard(Integer boardId);
}

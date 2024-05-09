package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.CommentPaginationResponseDto;
import com.HP50.be.domain.community.dto.CommentRequestDto;

import java.util.List;

public interface CommentService {
    void save(CommentRequestDto commentRequestDto);
    void deleteComment(Integer commentId);
    CommentPaginationResponseDto findCommentInBoard(Integer boardId, int page);
}

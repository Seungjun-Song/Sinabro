package com.HP50.be.domain.community.controller;

import com.HP50.be.domain.community.dto.CommentRequestDto;
import com.HP50.be.domain.community.service.CommentService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Comment", description = "댓글 관련된 API 모음입니다.")
@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @Operation(summary = "댓글 저장")
    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> saveComment(@RequestBody CommentRequestDto commentRequestDto){
        return commentService.save(commentRequestDto);
    }
}

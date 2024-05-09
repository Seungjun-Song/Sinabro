package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.CommentRequestDto;
import com.HP50.be.domain.community.dto.CommentResponseDto;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.community.entity.Comment;
import com.HP50.be.domain.community.repository.BoardRepository;
import com.HP50.be.domain.community.repository.CommentRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.member.service.MemberService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final BoardService boardService;
    @Override
    public ResponseEntity<BaseResponse<StatusCode>> save(CommentRequestDto commentRequestDto) {
        Member member = memberService.findById(commentRequestDto.getMemberId());
        Board board = boardService.findById(commentRequestDto.getBoardId());
        Comment comment = Comment.builder()
                .commentContent(commentRequestDto.getCommentContent())
                .board(board)
                .member(member)
                .build();
        commentRepository.save(comment);

        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Override
    public void deleteComment(Integer commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public List<CommentResponseDto> findCommentInBoard(Integer boardId) {
        Board board = boardService.findById(boardId);
        List<Comment> comments = commentRepository.findCommentsByBoard(board);
        List<CommentResponseDto> commentResponseDtos = comments.stream()
                .map(comment -> CommentResponseDto.builder()
                        .memberId(comment.getMember().getMemberId())
                        .commentId(comment.getCommentId())
                        .commentContent(comment.getCommentContent())
                        .memberName(comment.getMember().getMemberName())
                        .memberImg(comment.getMember().getMemberImg())
                        .createdDttm(comment.getCreatedDttm())
                        .build()).toList();

        return commentResponseDtos;
    }
}

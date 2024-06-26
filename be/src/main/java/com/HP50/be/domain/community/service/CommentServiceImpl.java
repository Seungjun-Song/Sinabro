package com.HP50.be.domain.community.service;

import com.HP50.be.domain.community.dto.CommentPaginationResponseDto;
import com.HP50.be.domain.community.dto.CommentRequestDto;
import com.HP50.be.domain.community.dto.CommentResponseDto;
import com.HP50.be.domain.community.dto.SliceTotalCountDto;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.community.entity.Comment;
import com.HP50.be.domain.community.repository.CommentCustomRepository;
import com.HP50.be.domain.community.repository.CommentRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.service.MemberService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final BoardService boardService;
    private final CommentCustomRepository commentCustomRepository;

    @Override
    public void save(CommentRequestDto commentRequestDto) {
        Member member = memberService.findById(commentRequestDto.getMemberId());
        Board board = boardService.findById(commentRequestDto.getBoardId());
        Comment comment = Comment.builder()
                .commentContent(commentRequestDto.getCommentContent())
                .board(board)
                .member(member)
                .build();
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Integer commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public CommentPaginationResponseDto findCommentInBoard(Integer boardId, int page) {
        PageRequest pageRequest = PageRequest.of(page, 10);

        SliceTotalCountDto<Comment> sliceTotalCountDto = commentCustomRepository.findCommentByBoard(boardId, pageRequest);
        Slice<Comment> comments = sliceTotalCountDto.getSlice();
        long totalCount = sliceTotalCountDto.getTotalCount();

        List<CommentResponseDto> commentResponseDtos = comments.stream()
                .map(comment -> CommentResponseDto.builder()
                        .memberId(comment.getMember().getMemberId())
                        .commentId(comment.getCommentId())
                        .commentContent(comment.getCommentContent())
                        .memberName(comment.getMember().getMemberName())
                        .memberImg(comment.getMember().getMemberImg())
                        .createdDttm(comment.getCreatedDttm())
                        .build()).toList();

        CommentPaginationResponseDto commentPaginationResponseDto = CommentPaginationResponseDto.builder()
                .hasNext(comments.hasNext())
                .totalCount(totalCount)
                .commentResponseDtos(commentResponseDtos)
                .build();

        return commentPaginationResponseDto;
    }
}

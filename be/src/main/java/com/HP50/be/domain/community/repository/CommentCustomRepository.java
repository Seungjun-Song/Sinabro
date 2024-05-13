package com.HP50.be.domain.community.repository;

import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.community.entity.Comment;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.HP50.be.domain.community.entity.QBoard.board;
import static com.HP50.be.domain.community.entity.QComment.comment;

@Repository
@RequiredArgsConstructor
@Transactional
public class CommentCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final BoardRepository boardRepository;

    public Slice<Comment> findCommentByBoard(Integer boardId, Pageable pageable) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        List<Comment> results = queryFactory
                .selectFrom(comment)
                .where(comment.board.eq(board))
                .orderBy(comment.commentId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = results.size() > pageable.getPageSize();

        List<Comment> comments = hasNext ? results.subList(0, pageable.getPageSize()) : results;

        return new SliceImpl<>(comments, pageable, hasNext);
    }
}

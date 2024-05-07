package com.HP50.be.domain.community.repository;


import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.repository.CategoryRepository;
import com.HP50.be.domain.community.dto.BoardFilterRequestDto;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.HP50.be.domain.community.entity.QBoard.board;

@Repository
@RequiredArgsConstructor
public class BoardCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final CategoryRepository categoryRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public List<Board> findByConditions(BoardFilterRequestDto boardFilterRequestDto) {
        Integer subCategoryBoard = boardFilterRequestDto.getSubCategoryBoard();
        Integer subCategoryCalender = boardFilterRequestDto.getSubCategoryCalender();
        Integer categoryJob = boardFilterRequestDto.getCategoryJob();
        String searchTitle = boardFilterRequestDto.getSearchTitle();

        List<Board> boards = queryFactory
                .select(board)
                .from(board)
                .fetch();

        //                .where(member.memberId.eq(jwtUtil.getMemberId(dto.getToken())))
//                .set(member.category, category)


        return boards;
    }
}

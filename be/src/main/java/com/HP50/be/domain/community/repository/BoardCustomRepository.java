package com.HP50.be.domain.community.repository;



import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.CategoryRepository;
import com.HP50.be.domain.code.service.SubCategoryService;
import com.HP50.be.domain.community.dto.BoardFilterRequestDto;
import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.global.jwt.JwtUtil;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Pageable;
import java.util.List;

import static com.HP50.be.domain.community.entity.QBoard.board;

@Repository
@RequiredArgsConstructor
@Transactional
public class BoardCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final SubCategoryService subCategoryService;
    private final CategoryRepository categoryRepository;
    private final JwtUtil jwtUtil;

    public Slice<Board> findByConditions(Integer boards,
                                         Integer calender,
                                         Integer job,
                                         String keyword,
                                         Pageable pageable) {

        SubCategory subCategory = subCategoryService.findById(boards);

        BooleanBuilder builder = new BooleanBuilder();

        if (boards != null && boards != 0) {
            builder.and(board.subCategory.eq(subCategory));
        }

        if (calender != null && calender != 0) {
            if (calender == 502) builder.and(board.communityProgress.eq(true));
            else if (calender == 503) builder.and(board.communityProgress.eq(false));
        }

        if (job != null && job != 0) {
            if (job == 100) builder.and(board.requiredPeopleFrontEnd.gt(0));
            if (job == 200) builder.and(board.requiredPeopleBackEnd.gt(0));
            if (job == 300) builder.and(board.requiredPeopleFullStack.gt(0));
        }

        if (keyword != null && !keyword.isEmpty()) {
            builder.and(board.boardTitle.like("%" + keyword + "%"));
        }

        List<Board> results = queryFactory
                .selectFrom(board)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        boolean hasNext = results.size() > pageable.getPageSize();

        List<Board> boardList = hasNext ? results.subList(0, pageable.getPageSize()) : results;

        return new SliceImpl<>(boardList, pageable, hasNext);
    }
}

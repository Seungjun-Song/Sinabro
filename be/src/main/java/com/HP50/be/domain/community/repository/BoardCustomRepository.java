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

    public Slice<Board> findByConditions(BoardFilterRequestDto boardFilterRequestDto, Pageable pageable) {
        Integer subCategoryBoard = boardFilterRequestDto.getSubCategoryBoard();
        Integer subCategoryCalender = boardFilterRequestDto.getSubCategoryCalender();
        Integer categoryJob = boardFilterRequestDto.getCategoryJob();
        String searchTitle = boardFilterRequestDto.getSearchTitle();

        SubCategory subCategory = subCategoryService.findById(subCategoryBoard);

        BooleanBuilder builder = new BooleanBuilder();

        if (subCategoryBoard != null && subCategoryBoard != 0) {
            builder.and(board.subCategory.eq(subCategory));
        }

        if (subCategoryCalender != null && subCategoryCalender != 0) {
            if (subCategoryCalender == 502) builder.and(board.communityProgress.eq(true));
            else if (subCategoryCalender == 503) builder.and(board.communityProgress.eq(false));
        }

        if (categoryJob != null && categoryJob != 0) {
            if (categoryJob == 100) builder.and(board.requiredPeopleFrontEnd.gt(0));
            if (categoryJob == 200) builder.and(board.requiredPeopleBackEnd.gt(0));
            if (categoryJob == 300) builder.and(board.requiredPeopleFullStack.gt(0));
        }

        if (searchTitle != null && !searchTitle.isEmpty()) {
            builder.and(board.boardTitle.like("%" + searchTitle + "%"));
        }

        List<Board> results = queryFactory
                .selectFrom(board)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        boolean hasNext = results.size() > pageable.getPageSize();

        List<Board> boards = hasNext ? results.subList(0, pageable.getPageSize()) : results;

        return new SliceImpl<>(boards, pageable, hasNext);
    }
}

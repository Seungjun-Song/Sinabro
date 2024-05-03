package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.entity.QCategory;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import static com.HP50.be.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class CategoryCustomRepositoryImpl implements CategoryCustomRepository{
    private final JPAQueryFactory queryFactory;
    private final CategoryRepository categoryRepository;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public ResponseEntity<BaseResponse<?>> savePersonalDuty(CategoryRequestDto dto) {

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new BaseException(StatusCode.BAD_REQUEST));

        queryFactory
                .update(member)
                .where(member.memberId.eq(jwtUtil.getMemberId(dto.getToken())))
                .set(member.category, category)
                .execute();

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(StatusCode.SUCCESS));
    }
}
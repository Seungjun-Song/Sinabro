package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.dto.CategoryResponseDto;
import com.HP50.be.domain.code.dto.SubCategoryTechStackDto;
import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.entity.QCategory;
import com.HP50.be.domain.code.entity.QSubCategory;
import com.HP50.be.domain.code.entity.SubCategory;
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

import java.util.ArrayList;
import java.util.List;

import static com.HP50.be.domain.code.entity.QSubCategory.subCategory;
import static com.HP50.be.domain.member.entity.QMember.member;
import static com.HP50.be.domain.code.entity.QCategory.category;

@Repository
@RequiredArgsConstructor
public class CategoryCustomRepositoryImpl implements CategoryCustomRepository{
    private final JPAQueryFactory queryFactory;
    private final CategoryRepository categoryRepository;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public void savePersonalDuty(String token, CategoryRequestDto dto) {

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new BaseException(StatusCode.BAD_REQUEST));

        queryFactory
                .update(member)
                .where(member.memberId.eq(jwtUtil.getMemberId(token)))
                .set(member.category, category)
                .execute();

    }

    @Override
    public List<CategoryResponseDto> findAllJob() {
        List<Category> categories = queryFactory
                .select(category)
                .from(category)
                // 프론트, 백, 풀스택 100, 200, 300 으로 301 보다 작은걸 가져오기 때문에 모든 직무를 가져옴
                .where(category.CategoryId.lt(301))
                .fetch();

        List<CategoryResponseDto> categoryResponseDtos = new ArrayList<>();

        for (Category category: categories){
            CategoryResponseDto categoryResponseDto = CategoryResponseDto.builder()
                    .categoryId(category.getCategoryId())
                    .categoryJob(category.getCategoryName())
                    .build();
            categoryResponseDtos.add(categoryResponseDto);
        }

        return categoryResponseDtos;
    }

    @Override
    public List<SubCategoryTechStackDto> findAllBySubCategoryIdLessThan301() {
        List<SubCategory> subCategories = queryFactory
                .select(subCategory)
                .from(subCategory)
                // 300 이하가 기술스택 관련된 subCategoryId이기 때문에 보다 작은걸 가져오기 때문에 모든 직무를 가져옴
                .where(subCategory.subCategoryId.lt(301))
                .fetch();

        List<SubCategoryTechStackDto> SubCategoryTechStackDtos = subCategories.stream().map(subCategory -> SubCategoryTechStackDto.builder()
                .subCategoryId(subCategory.getSubCategoryId())
                .subCategoryJob(subCategory.getSubCategoryName())
                .build()).toList();

        return SubCategoryTechStackDtos;
    }
}
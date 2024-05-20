package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.TechStack;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.HP50.be.domain.member.entity.QTechStack.techStack;
import static com.HP50.be.domain.project.entity.QProject.project;

@Repository
@RequiredArgsConstructor
public class TechStackCustomRepositoryImpl implements TechStackCustomRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<TechStack> getByMemberIdAndCategoryId(Integer memberId, Integer categoryId) {
        return queryFactory.select(
                        techStack
                )
                .from(techStack)
                .where(
                        techStack.member.memberId.eq(memberId)

                                .and(techStack.subCategory.category.CategoryId.eq(categoryId))
                )
                .fetch();
    }
}

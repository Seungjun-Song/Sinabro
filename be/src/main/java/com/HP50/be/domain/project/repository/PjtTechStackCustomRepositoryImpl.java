package com.HP50.be.domain.project.repository;

import com.HP50.be.domain.project.entity.PjtTechStack;
import com.HP50.be.domain.project.entity.Teammate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.HP50.be.domain.code.entity.QSubCategory.subCategory;
import static com.HP50.be.domain.project.entity.QPjtTechStack.pjtTechStack;
import static com.HP50.be.domain.project.entity.QTeammate.teammate;

@Repository
@RequiredArgsConstructor
public class PjtTechStackCustomRepositoryImpl implements PjtTechStackCustomRepository{
    private final JPAQueryFactory queryFactory;


    @Override
    public List<String> getProjectTechStacks(Integer projectId) {
        // 이번 프로젝트에 어떤 사람이 참가했는지에 대한 리스트
        List<Teammate> teammateList = queryFactory.selectFrom(teammate)
                .where(teammate.project.projectId.eq(projectId))
                .fetch();

        // 기술스택의 이름으로 distinct 를 진행해서 해당 프로젝트에 참여한 사람의 기술 스택을 중복제거하여 이름만 제공
        List<String> distinctNames = queryFactory.select(pjtTechStack.subcategoryName)
                .where(pjtTechStack.teammate.in(teammateList))
                .from(pjtTechStack)
                .distinct()
                .fetch();

        return distinctNames;
    }
}

package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.MilestoneResponseDto;
import com.HP50.be.domain.calender.entity.Milestone;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.HP50.be.domain.calender.entity.QCalender.calender;
import static com.HP50.be.domain.calender.entity.QMilestone.milestone;

@Repository
@RequiredArgsConstructor
public class MilestoneCustomRepositoryImpl implements MilestoneCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<MilestoneResponseDto> findMilestoneInProject(Integer projectId) {

        List<Milestone> fetch = jpaQueryFactory
                .select(milestone)
                .from(milestone)
                .where(milestone.project.projectId.eq(projectId))
                .fetch();

        System.out.println(fetch);

        return null;
    }

    @Override
    public Milestone findMilestoneById(Integer milestoneId) {
        jpaQueryFactory
                .select(milestone)
                .from(milestone)
                .where(milestone.project.projectId.eq(milestoneId))
                ;
        return null;
    }
}

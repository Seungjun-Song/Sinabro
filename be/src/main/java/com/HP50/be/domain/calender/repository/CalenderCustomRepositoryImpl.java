package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;
import com.HP50.be.domain.calender.entity.Milestone;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.HP50.be.domain.calender.entity.QCalender.calender;
import static com.HP50.be.domain.calender.entity.QMilestone.milestone;


@Repository
@RequiredArgsConstructor
public class CalenderCustomRepositoryImpl implements CalenderCustomRepository{
    private final JPAQueryFactory queryFactory;
    //프로젝트에서 나의 일정
    @Override
    public List<MyCalenderDto> getMySchedulesInProject(int memberId, int projectId) {
        return queryFactory.select(calender)
                .from(calender)
                .leftJoin(calender.milestone, milestone)
                .on(milestone.milestoneId.isNotNull())
                .where(calender.member.memberId.eq(memberId),
                        calender.project.projectId.eq(projectId))
                .fetch()
                .stream()
                .map(entity -> MyCalenderDto.builder()
                        .calenderId(entity.getCalenderId())
                        .subCategoryId(entity.getSubCategory().getSubCategoryId())
                        .calenderStartDt(entity.getCalenderStartDt())
                        .calenderEndDt(entity.getCalenderEndDt())
                        .calenderName(entity.getCalenderName()).
                        milestoneId(Optional.ofNullable(entity.getMilestone()).map(Milestone::getMilestoneId).orElse(null))
                        .milestoneName(Optional.ofNullable(entity.getMilestone()).map(Milestone::getMilestoneTitle).orElse(null))
                        .build())
                .toList();
    }
    // 나의 전체 일정
    @Override
    public List<MyCalenderDto> getMySchedules(int memberId) {
        return queryFactory.select(calender)
                .from(calender)
                .leftJoin(calender.milestone, milestone)
                .on(milestone.milestoneId.isNotNull())
                .where(calender.member.memberId.eq(memberId))
                .fetch()
                .stream()
                .map(entity -> MyCalenderDto.builder()
                        .calenderId(entity.getCalenderId())
                        .subCategoryId(entity.getSubCategory().getSubCategoryId())
                        .calenderStartDt(entity.getCalenderStartDt())
                        .calenderEndDt(entity.getCalenderEndDt())
                        .calenderName(entity.getCalenderName()).
                        milestoneId(Optional.ofNullable(entity.getMilestone()).map(Milestone::getMilestoneId).orElse(null))
                        .milestoneName(Optional.ofNullable(entity.getMilestone()).map(Milestone::getMilestoneTitle).orElse(null))
                        .build())
                .toList();
    }
    // 프로젝트 전체 일정
    @Override
    public List<CalenderDto> getProjectCalender(int projectId) {
        return queryFactory.select(calender)
                .from(calender)
                .leftJoin(calender.milestone, milestone)
                .on(milestone.milestoneId.isNotNull())
                .where(calender.project.projectId.eq(projectId))
                .fetch()
                .stream()
                .map(entity -> CalenderDto.builder()
                        .calenderId(entity.getCalenderId())
                        .memberId(entity.getMember().getMemberId())
                        .memberImg(entity.getMember().getMemberImg())
                        .memberName(entity.getMember().getMemberName())
                        .subCategoryId(entity.getSubCategory().getSubCategoryId())
                        .calenderStartDt(entity.getCalenderStartDt())
                        .calenderEndDt(entity.getCalenderEndDt())
                        .calenderName(entity.getCalenderName()).
                        milestoneId(Optional.ofNullable(entity.getMilestone()).map(Milestone::getMilestoneId).orElse(null))
                                .milestoneName(Optional.ofNullable(entity.getMilestone()).map(Milestone::getMilestoneTitle).orElse(null))
                        .build())
                .toList();
    }
}

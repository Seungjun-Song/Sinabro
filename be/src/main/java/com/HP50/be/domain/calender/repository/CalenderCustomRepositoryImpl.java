package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.HP50.be.domain.calender.entity.QCalender.calender;
import static com.HP50.be.domain.code.entity.QSubCategory.subCategory;

@Repository
@RequiredArgsConstructor
public class CalenderCustomRepositoryImpl implements CalenderCustomRepository{
    private final JPAQueryFactory queryFactory;
    //프로젝트에서 나의 일정
    @Override
    public List<MyCalenderDto> getMySchedulesInProject(int memberId, int projectId) {
        List<MyCalenderDto> result = queryFactory.select(
                        Projections.constructor(
                                MyCalenderDto.class,
                                calender.calenderId.as("calenderId"),
                                calender.subCategory.subCategoryId.as("subCategoryId"),
                                calender.calenderStartDt.as("calenderStartDt"),
                                calender.calenderEndDt.as("calenderEndDt"),
                                calender.calenderName.as("calenderName")
                        )
                ).from(calender)
                .where(calender.member.memberId.eq(memberId).and(
                        calender.project.projectId.eq(projectId)
                )).fetch();
        return result;
    }
    // 나의 전체 일정
    @Override
    public List<MyCalenderDto> getMySchedules(int memberId) {
        List<MyCalenderDto> result = queryFactory.select(
                        Projections.constructor(
                                MyCalenderDto.class,
                                calender.calenderId.as("calenderId"),
                                calender.subCategory.subCategoryId.as("subCategoryId"),
                                calender.calenderStartDt.as("calenderStartDt"),
                                calender.calenderEndDt.as("calenderEndDt"),
                                calender.calenderName.as("calenderName")
                        )
                ).from(calender)
                .where(calender.member.memberId.eq(memberId)
                ).fetch();
        return result;
    }
    // 프로젝트 전체 일정
    @Override
    public List<CalenderDto> getProjectCalender(int projectId) {
        return queryFactory.select(
                        Projections.constructor(
                                CalenderDto.class,
                                calender.calenderId.as("calenderId"),
                                calender.member.memberId.as("memberId"),//담당자
                                calender.subCategory.subCategoryId.as("subCategoryId"),
                                calender.calenderStartDt.as("calenderStartDt"),
                                calender.calenderEndDt.as("calenderEndDt"),
                                calender.calenderName.as("calenderName")
                        )
                ).from(calender)
                .where(calender.project.projectId.eq(projectId))
                .fetch();
    }
}
package com.HP50.be.domain.calender.repository;

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
                .join(calender.subCategory, subCategory)
                .where(calender.member.memberId.eq(memberId).and(
                        calender.project.projectId.eq(projectId)
                )).fetch();


        return result;
    }
}

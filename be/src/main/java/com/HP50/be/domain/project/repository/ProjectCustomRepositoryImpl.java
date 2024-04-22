package com.HP50.be.domain.project.repository;

import com.HP50.be.domain.project.dto.PjtTechInfo;
import com.HP50.be.domain.project.dto.ProjectInfoDto;
import com.HP50.be.domain.project.dto.TeammateInfo;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.HP50.be.domain.code.entity.QSubCategory.subCategory;
import static com.HP50.be.domain.project.entity.QPjtTechStack.pjtTechStack;
import static com.HP50.be.domain.project.entity.QProject.project;
import static com.HP50.be.domain.project.entity.QTeammate.teammate;

@Repository
@RequiredArgsConstructor
public class ProjectCustomRepositoryImpl implements ProjectCustomRepository{
    private final JPAQueryFactory queryFactory;
    @Override
    public ProjectInfoDto getTeamInfo(int projectId,int memberId) {
        //1. 프로젝트 정보 가져오기
        ProjectInfoDto result = queryFactory.select(
                        Projections.constructor(
                                ProjectInfoDto.class,
                                subCategory.subCategoryName.as("status"),
                                project.projectName.as("projectName"),
                                project.projectInfo.as(("projectInfo")),
                                project.projectImg.as("projectImg"),
                                project.projectRepo.as("projectRepo"),
                                project.createdDttm.as("createdDttm"),
                                project.endDttm.as("endDttm")
                        )
                ).from(project)
                .join(project.subCategory, subCategory)
                .where(project.projectId.eq(projectId))
                .fetchOne();
        // 2. 해당 프로젝트 팀원 가져오기
        List<TeammateInfo> teamList = queryFactory.select(
                        Projections.constructor(
                                TeammateInfo.class,
                                teammate.teammateId.as("teammateId"),
                                teammate.member.memberId.as("memberId"),
                                teammate.member.memberName.as("memberName"),
                                teammate.member.memberImg.as("memberImg"),
                                teammate.teammateReader.as("teamReader")
                        )
                ).from(teammate)
                .where(project.projectId.eq(projectId)).fetch();
        // ID만 뽑기
        List<Integer> memberIdList = teamList.stream().map(TeammateInfo::getMemberId).toList();
        // 3. 팀원 아이디에 해당하는 애들가져와서 pjtTech정보 가져옴
        List<PjtTechInfo> techList = queryFactory.select(
                        Projections.constructor(
                                PjtTechInfo.class,
                                pjtTechStack.teammate.member.memberId.as("memberId"),
                                pjtTechStack.subcategoryName.as("subcategoryName")
                        )
                ).from(pjtTechStack)
                .where(pjtTechStack.teammate.member.memberId.in(memberIdList))
                .fetch();
        // 4. map으로 연결
        Map<Integer, List<String>> tech = techList.stream()
                .collect(Collectors.groupingBy(
                        PjtTechInfo::getMemberId, // memberId를 기준으로 그룹화
                        Collectors.mapping(PjtTechInfo::getSubcategoryName, Collectors.toList()) // subcategoryName을 List로 매핑
                ));
        // 연결중
        for(TeammateInfo info: teamList){
            Integer id = info.getMemberId();
            info.setTechStack(tech.get(id));
        }
        //프로젝트 정보에 연결
        result.setTeammateInfoList(teamList);
        return result;
    }
}

package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;
import com.HP50.be.domain.calender.entity.Calender;
import com.HP50.be.domain.calender.repository.CalenderRepository;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.SubCategoryRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectCustomRepository;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CalenderServiceImpl implements CalenderService{
    private final CalenderRepository calenderRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProjectCustomRepository projectCustomRepository;
    @Override
    public boolean createCalender(int memberId, CreateCalenderRequestDto requestDto) {
        //1. 요청 유저가 프로젝트에 속해있는지 확인
        boolean isTeammate = projectCustomRepository.isTeammate(memberId, requestDto.getProjectId());
        if(!isTeammate){
            throw new BaseException(StatusCode.NOT_TEAM_MEMBER);
        }
        //2. 속해있다면 일정 생성
        // Calender 추가하기 위한 entity 가져오기 
        Project project = projectRepository.findById(requestDto.getProjectId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        SubCategory subCategory = subCategoryRepository.findById(501).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));
        // 가져온 entity들로 Calender Entity 생성
        Calender calender = Calender.builder()
                .calenderName(requestDto.getCalenderName())
                .calenderStartDt(requestDto.getCalenderStartDt())
                .calenderEndDt(requestDto.getCalenderEndDt())
                .project(project)
                .member(member)
                .subCategory(subCategory)
                .build();
        // 저장
        calenderRepository.save(calender);
        return true;
    }
}

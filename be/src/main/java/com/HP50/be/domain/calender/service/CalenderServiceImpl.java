package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.CalenderRequestDto;
import com.HP50.be.domain.calender.dto.CreateCalenderRequestDto;
import com.HP50.be.domain.calender.dto.MyCalenderDto;
import com.HP50.be.domain.calender.entity.Calender;
import com.HP50.be.domain.calender.entity.Milestone;
import com.HP50.be.domain.calender.repository.CalenderCustomRepository;
import com.HP50.be.domain.calender.repository.CalenderRepository;
import com.HP50.be.domain.calender.repository.MilestoneRepository;
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

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CalenderServiceImpl implements CalenderService{
    private final CalenderRepository calenderRepository;
    private final MilestoneRepository milestoneRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProjectCustomRepository projectCustomRepository;
    private final CalenderCustomRepository calenderCustomRepository;

    //일정추가

    @Override
    public boolean createCalender(int memberId, CreateCalenderRequestDto requestDto) {
        //1. 요청 유저가 프로젝트에 속해있는지 확인 + 담당자가 팀원인지 확인
        boolean isTeammate = projectCustomRepository.isTeammate(memberId, requestDto.getProjectId());
        boolean isTeammate2 = projectCustomRepository.isTeammate(requestDto.getManagerId(), requestDto.getProjectId());
        if(!isTeammate ||!isTeammate2){
            throw new BaseException(StatusCode.NOT_TEAM_MEMBER);
        }
        //2. 속해있다면 일정 생성
        // Calender 추가하기 위한 entity 가져오기
        Project project = projectRepository.findById(requestDto.getProjectId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        Member member = memberRepository.findById(requestDto.getManagerId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
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

        if (requestDto.getMilestoneId() != null) calender.setMilestone(
                this.milestoneRepository.findById(requestDto.getManagerId()).orElse(null));


        // 저장
        calenderRepository.save(calender);
        return true;
    }
    // 일정 상태 수정
    @Override
    public boolean updateCalender(int memberId, CalenderRequestDto requestDto) {
        //1. 팀원인지 확인
        boolean isTeammate = projectCustomRepository.isTeammate(memberId, requestDto.getProjectId());
        if(!isTeammate){
            throw new BaseException(StatusCode.NOT_TEAM_MEMBER);
        }
        //2. 팀원이라면 상태 변경 가능. SubCategory 코드를 가져온다.
        SubCategory subCategory = subCategoryRepository.findById(requestDto.getSubCategoryId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));

        //3. Calender Entity도 가져옴.
        Calender calender = calenderRepository.findById(requestDto.getCalenderId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CALENDER));
        //4. 상태 업데이트
        calender.updateSubCategory(subCategory);
        return true;
    }
    // 일정 삭제
    @Override
    public boolean deleteCalender(int memberId, CalenderRequestDto requestDto) {
        //1. 멤버인지 확인
        boolean isTeammate = projectCustomRepository.isTeammate(memberId, requestDto.getProjectId());
        if(!isTeammate){
            throw new BaseException(StatusCode.NOT_TEAM_MEMBER);
        }
        //2. 멤버면 삭제 가능
        Calender calender = calenderRepository.findById(requestDto.getCalenderId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CALENDER));
        calenderRepository.delete(calender);
        return true;
    }
    // 프로젝트에서 나의 일정 조회
    @Override
    public List<MyCalenderDto> getMySchedulesInProject(int memberId,int projectId) {
        //멤버Id와 projectId기준으로 일정 가져옴.
        List<MyCalenderDto> result = calenderCustomRepository.getMySchedulesInProject(memberId, projectId);
        if(result==null){
            throw new BaseException(StatusCode.NOT_EXIST_CALENDER);
        }
        return result;
    }
    // 나의 일정 조회
    @Override
    public List<MyCalenderDto> getMySchedules(int memberId) {
        List<MyCalenderDto> result = calenderCustomRepository.getMySchedules(memberId);
        if(result==null){
            throw new BaseException(StatusCode.NOT_EXIST_CALENDER);
        }
        return result;
    }
    //프로젝트 전체 일정 조회
    @Override
    public List<CalenderDto> getProjectCalender(int projectId) {

        List<CalenderDto> result = calenderCustomRepository.getProjectCalender(projectId);
        if(result==null){
            throw new BaseException(StatusCode.NOT_EXIST_CALENDER);
        }
        return result;
    }
}

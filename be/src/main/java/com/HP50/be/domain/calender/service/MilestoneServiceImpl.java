package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.CalenderDto;
import com.HP50.be.domain.calender.dto.MilestoneResponseDto;
import com.HP50.be.domain.calender.dto.MilestoneSaveRequestDto;
import com.HP50.be.domain.calender.entity.Milestone;
import com.HP50.be.domain.calender.repository.MilestoneCustomRepository;
import com.HP50.be.domain.calender.repository.MilestoneRepository;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.SubCategoryRepository;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.domain.project.service.ProjectService;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.HP50.be.domain.calender.entity.QMilestone.milestone;

@Service
@RequiredArgsConstructor
public class MilestoneServiceImpl implements MilestoneService{
    private final MilestoneRepository milestoneRepository;
    private final MilestoneCustomRepository milestoneCustomRepository;
    private final ProjectRepository projectRepository;
    private final SubCategoryRepository subCategoryRepository;


    @Override
    public void saveMilestone(MilestoneSaveRequestDto requestDto) {
        Project project = projectRepository.findById(requestDto.getProjectId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        SubCategory subCategory = subCategoryRepository.findById(requestDto.getSubCategoryId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));

        milestoneRepository.save(
                Milestone.builder()
                        .milestoneId(requestDto.getMilestoneId())
                        .milestoneTitle(requestDto.getMilestoneTitle())
                        .milestoneContent(requestDto.getMilestoneContent())
                        .milestoneStartDttm(requestDto.getMilestoneStartDt())
                        .milestoneEndDttm(requestDto.getMilestoneEndDt())
                        .project(project)
                        .subCategory(subCategory)
                        .build()
        );
    }

    @Override
    public void deleteMilestone(Integer milestoneId) {
        milestoneRepository.deleteById(milestoneId);
    }

    @Override
    public MilestoneResponseDto findMileStoneById(Integer milestoneId) {
        return milestoneRepository.findById(milestoneId)
                .map(entity -> MilestoneResponseDto.builder()
                        .milestoneId(entity.getMilestoneId())
                        .milestoneTitle(entity.getMilestoneTitle())
                        .milestoneContent(entity.getMilestoneContent())
                        .milestoneStartDt(entity.getMilestoneStartDttm())
                        .milestoneEndDt(entity.getMilestoneEndDttm())
                        .projectId(entity.getProject().getProjectId())
                        .subCategoryName(entity.getSubCategory().getSubCategoryName())
                        .calenderDtoList(entity.getCalenders().stream()
                                .map(dto -> CalenderDto.builder()
                                        .calenderId(dto.getCalenderId())
                                        .memberId(dto.getMember().getMemberId())
                                        .memberImg(dto.getMember().getMemberImg())
                                        .memberName(dto.getMember().getMemberName())
                                        .subCategoryId(dto.getSubCategory().getSubCategoryId())
                                        .calenderStartDt(dto.getCalenderStartDt())
                                        .calenderEndDt(dto.getCalenderEndDt())
                                        .calenderName(dto.getCalenderName())
                                        .build())
                                .toList())
                        .build()
                )
                .orElseThrow(() -> new BaseException(StatusCode.BAD_REQUEST));

    }

    @Override
    public List<MilestoneResponseDto> findMilestoneByProjectId(Integer projectId) {

        List<Milestone> milestones = milestoneRepository.findMilestonesByProjectProjectId(projectId);

        return milestones.stream()
                .map(entity -> this.findMileStoneById(entity.getMilestoneId()))
                .toList();
    }
}

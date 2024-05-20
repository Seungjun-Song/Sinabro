package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.MilestoneResponseDto;
import com.HP50.be.domain.calender.dto.MilestoneSaveRequestDto;

import java.util.List;

public interface MilestoneService {
    void saveMilestone(MilestoneSaveRequestDto requestDto);
    void deleteMilestone(Integer milestoneId);
    MilestoneResponseDto findMileStoneById(Integer milestoneId);
    List<MilestoneResponseDto> findMilestoneByProjectId(Integer projectId);

}

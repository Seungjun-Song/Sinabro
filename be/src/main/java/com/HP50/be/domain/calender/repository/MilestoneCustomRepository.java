package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.dto.MilestoneResponseDto;
import com.HP50.be.domain.calender.entity.Milestone;

import java.util.List;

public interface MilestoneCustomRepository {
    List<MilestoneResponseDto> findMilestoneInProject(Integer projectId);
    Milestone findMilestoneById(Integer milestoneId);
}

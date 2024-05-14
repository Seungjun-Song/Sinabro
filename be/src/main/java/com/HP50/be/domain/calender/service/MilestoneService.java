package com.HP50.be.domain.calender.service;

import com.HP50.be.domain.calender.dto.MilestoneSaveRequestDto;

public interface MilestoneService {
    void saveMilestone(MilestoneSaveRequestDto requestDto);
    void deleteMilestone(String token);



}

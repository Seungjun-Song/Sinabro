package com.HP50.be.domain.calender.controller;

import com.HP50.be.domain.calender.dto.MilestoneResponseDto;
import com.HP50.be.domain.calender.dto.MilestoneSaveRequestDto;
import com.HP50.be.domain.calender.service.MilestoneService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.util.List;

@Tag(name = "Milestone", description = "Milestone 관련 API 모음입니다.")
@RestController
@RequestMapping("/milestones")
@RequiredArgsConstructor
public class MilestoneController {
    private final MilestoneService milestoneService;

    @Operation(summary = "마일스톤 저장", description = "milestone_id 를 보내지 않는다면 Save\n"
                                                        + "milestone_id 를 보낸다면 update")
    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> saveMilestone(@RequestBody MilestoneSaveRequestDto dto){
        milestoneService.saveMilestone(dto);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "마일스톤 삭제")
    @DeleteMapping("/{milestoneId}")
    public ResponseEntity<BaseResponse<StatusCode>> deleteMilestone(@PathVariable Integer milestoneId){
        milestoneService.deleteMilestone(milestoneId);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }
}

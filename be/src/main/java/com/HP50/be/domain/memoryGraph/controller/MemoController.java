package com.HP50.be.domain.memoryGraph.controller;

import com.HP50.be.domain.memoryGraph.dto.MemoDto;
import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.service.MemoService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/memo")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;
    @GetMapping
    public List<Memo> findAll(@AuthenticationPrincipal CustomOAuth2MemberDto dto){
        System.out.println(dto);
        return this.memoService.findAll();
    }

    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> saveMemo(@RequestBody MemoDto memoDto){
        memoService.saveMemo(memoDto);
        return null;
    }
}

package com.HP50.be.domain.memoryGraph.controller;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.service.MemoService;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/memo")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;
    @GetMapping
    public Flux<Memo> findAll(@AuthenticationPrincipal CustomOAuth2MemberDto dto){
        System.out.println(dto);
        return this.memoService.findAll();
    }
}

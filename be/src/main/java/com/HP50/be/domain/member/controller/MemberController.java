package com.HP50.be.domain.member.controller;

import com.HP50.be.domain.member.dto.SearchMemberResponseDto;
import com.HP50.be.domain.member.service.MemberService;
import com.HP50.be.global.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    // 유저 검색
    @GetMapping
    public ResponseEntity<Object> searchMember(@RequestParam String keyword,
                                             @RequestParam Integer page){
        SearchMemberResponseDto result = memberService.searchMember(keyword, page);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }

    @GetMapping("{test}")
    public String test(@PathVariable("test") String test){
        return test;
    }

}

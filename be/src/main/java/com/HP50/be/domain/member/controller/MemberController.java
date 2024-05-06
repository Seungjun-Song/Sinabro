package com.HP50.be.domain.member.controller;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.service.CategoryService;
import com.HP50.be.domain.member.dto.SearchMemberResponseDto;
import com.HP50.be.domain.member.dto.TechStackDto;
import com.HP50.be.domain.member.service.MemberService;
import com.HP50.be.domain.member.service.TechStackService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final CategoryService categoryService;
    private final TechStackService techStackService;
    // 유저 검색
    @GetMapping
    public ResponseEntity<Object> searchMember(@RequestParam String keyword,
                                             @RequestParam Integer page) {
        SearchMemberResponseDto result = memberService.searchMember(keyword, page);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }

    @PutMapping
    public ResponseEntity<BaseResponse<?>> updateCategoryInMember(@RequestBody CategoryRequestDto dto){
        return categoryService.savePersonalDuty(dto);
    }

    @PostMapping
    public ResponseEntity<?> SaveTechStack(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                           @RequestBody List<TechStackDto> dtos){
        return techStackService.save(token, dtos);
    }

    @DeleteMapping
    public ResponseEntity<?> SaveTechStack(@RequestBody List<TechStackDto> dtos){
        return techStackService.delete(dtos);
    }
}

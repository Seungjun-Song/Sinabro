package com.HP50.be.domain.code.controller;

import com.HP50.be.domain.code.dto.CategoryResponseDto;
import com.HP50.be.domain.code.dto.SubCategoryTechStackDto;
import com.HP50.be.domain.code.service.CategoryService;
import com.HP50.be.domain.code.service.SubCategoryService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Code", description = "일정, 직무, 게시판 종류 관련 API 모음입니다.")
@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeController {
    private final CategoryService categoryService;
    private final SubCategoryService subCategoryService;

    @Operation(summary = "프론트, 백, 풀스택 분류 가져오기")
    @GetMapping("/job")
    public ResponseEntity<BaseResponse<List<CategoryResponseDto>>> getCategoryJobs(){
        return ResponseEntity.ok().body(new BaseResponse<>(categoryService.findAllJob()));
    }

    @Operation(summary = "리액트, 뷰, 스프링 등 기술스택 가져오기")
    @GetMapping("/techStacks")
    public ResponseEntity<BaseResponse<List<SubCategoryTechStackDto>>> getTechStacks(){
        return ResponseEntity.ok().body(new BaseResponse<>(subCategoryService.findAllBySubCategoryIdLessThan301()));
    }
}

package com.HP50.be.domain.code.service;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.dto.CategoryResponseDto;
import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.global.common.BaseResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    ResponseEntity<BaseResponse<?>> savePersonalDuty(CategoryRequestDto dto);

    List<CategoryResponseDto> findAllJob();
}

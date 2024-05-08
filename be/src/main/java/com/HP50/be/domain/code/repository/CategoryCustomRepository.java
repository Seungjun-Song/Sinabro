package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.dto.CategoryResponseDto;
import com.HP50.be.domain.code.dto.SubCategoryTechStackDto;
import com.HP50.be.global.common.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryCustomRepository {
    ResponseEntity<BaseResponse<?>> savePersonalDuty(String token, CategoryRequestDto dto);
    List<CategoryResponseDto> findAllJob();
    List<SubCategoryTechStackDto> findAllBySubCategoryIdLessThan301();

}

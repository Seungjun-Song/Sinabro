package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.global.common.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface CategoryCustomRepository {
    ResponseEntity<BaseResponse<?>> savePersonalDuty(CategoryRequestDto dto);
}

package com.HP50.be.domain.code.service;

import com.HP50.be.domain.code.dto.CategoryRequestDto;
import com.HP50.be.domain.code.dto.CategoryResponseDto;
import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.repository.CategoryCustomRepository;
import com.HP50.be.domain.code.repository.CategoryRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryCustomRepository categoryCustomRepository;
    private final JwtUtil jwtUtil;

    @Override
    public ResponseEntity<BaseResponse<?>> savePersonalDuty(String token, CategoryRequestDto dto) {
        return categoryCustomRepository.savePersonalDuty(token, dto);
    }

    @Override
    public List<CategoryResponseDto> findAllJob() {
        return categoryCustomRepository.findAllJob();
    }

}

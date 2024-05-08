package com.HP50.be.domain.code.service;

import com.HP50.be.domain.code.dto.SubCategoryTechStackDto;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.CategoryCustomRepository;
import com.HP50.be.domain.code.repository.SubCategoryRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubCategoryServiceImpl implements SubCategoryService{
    private final SubCategoryRepository subCategoryRepository;
    private final CategoryCustomRepository categoryCustomRepository;

    @Override
    public SubCategory findById(Integer id) {
    return subCategoryRepository.findById(id).orElseThrow(() ->
            new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));
    }

    @Override
    public List<SubCategoryTechStackDto> findAllBySubCategoryIdLessThan301() {


        return categoryCustomRepository.findAllBySubCategoryIdLessThan301();
    }
}

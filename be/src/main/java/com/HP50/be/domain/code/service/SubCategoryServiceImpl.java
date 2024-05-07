package com.HP50.be.domain.code.service;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.SubCategoryRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubCategoryServiceImpl implements SubCategoryService{
    private final SubCategoryRepository subCategoryRepository;

    @Override
    public SubCategory findById(Integer id) {
    return subCategoryRepository.findById(id).orElseThrow(() ->
            new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));
    }
}

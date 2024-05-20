package com.HP50.be.domain.code.service;

import com.HP50.be.domain.code.dto.SubCategoryTechStackDto;
import com.HP50.be.domain.code.entity.SubCategory;

import java.util.List;

public interface SubCategoryService {
    SubCategory findById(Integer id);
    List<SubCategoryTechStackDto> findAllBySubCategoryIdLessThan301();
}

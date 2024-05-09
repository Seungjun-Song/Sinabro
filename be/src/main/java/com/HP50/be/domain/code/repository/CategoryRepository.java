package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.dto.SubCategoryTechStackDto;
import com.HP50.be.domain.code.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}

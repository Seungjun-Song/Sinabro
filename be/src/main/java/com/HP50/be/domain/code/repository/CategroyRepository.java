package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategroyRepository extends JpaRepository<Category,Integer> {
}

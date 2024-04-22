package com.HP50.be.domain.code.repository;

import com.HP50.be.domain.code.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

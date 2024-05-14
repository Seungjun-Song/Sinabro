package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.TechStack;

import java.util.List;

public interface TechStackCustomRepository {
    List<TechStack> getByMemberIdAndCategoryId(Integer memberId, Integer categoryId);
}

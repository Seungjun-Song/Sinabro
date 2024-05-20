package com.HP50.be.domain.project.repository;

import com.HP50.be.domain.project.entity.PjtTechStack;

import java.util.List;

public interface PjtTechStackCustomRepository {
    List<String> getProjectTechStacks(Integer projectId);
}

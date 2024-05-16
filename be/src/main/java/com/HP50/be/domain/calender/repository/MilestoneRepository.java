package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.entity.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Integer> {
    List<Milestone> findMilestonesByProjectProjectId(Integer projectId);
}

package com.HP50.be.domain.project.repository;


import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.entity.Teammate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeammateRepository  extends JpaRepository<Teammate,Integer> {
    List<Teammate> findTeammatesByProjectProjectId(Integer projectId);
}

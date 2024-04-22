package com.HP50.be.domain.project.repository;


import com.HP50.be.domain.project.entity.Teammate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeammateRepository  extends JpaRepository<Teammate,Integer> {
}

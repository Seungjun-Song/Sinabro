package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TechStackRepository extends JpaRepository<TechStack, Integer> {

}

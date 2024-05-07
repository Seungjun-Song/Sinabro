package com.HP50.be.domain.community.repository;

import com.HP50.be.domain.community.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {
}

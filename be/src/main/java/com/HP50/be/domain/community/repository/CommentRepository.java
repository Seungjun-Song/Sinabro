package com.HP50.be.domain.community.repository;

import com.HP50.be.domain.community.entity.Board;
import com.HP50.be.domain.community.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findCommentsByBoard(Board board);
}

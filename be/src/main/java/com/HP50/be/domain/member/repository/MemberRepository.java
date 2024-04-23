package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByMemberEmail(String email);
}

package com.HP50.be.domain.memoryGraph.repository;

import com.HP50.be.domain.member.entity.Member;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.support.CypherdslConditionExecutor;

public interface Neo4jMemberRepository extends ReactiveNeo4jRepository<Member, Long>,
        CypherdslConditionExecutor<Member> {
}

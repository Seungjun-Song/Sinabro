package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Neo4jMemberServiceImpl implements Neo4jMemberService{

    private final Neo4jMemberRepository neo4jMemberRepository;


}

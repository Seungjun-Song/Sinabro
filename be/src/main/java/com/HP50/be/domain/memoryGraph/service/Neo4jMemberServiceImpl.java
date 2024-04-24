package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberDto;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import com.HP50.be.global.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.neo4j.cypherdsl.core.Cypher;
import org.neo4j.cypherdsl.core.Node;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class Neo4jMemberServiceImpl implements Neo4jMemberService{

    private final Neo4jMemberRepository neo4jMemberRepository;


    @Override
    public ResponseEntity<Flux<Neo4jMember>> getMember(String email) {
        Node p = Cypher.node("Member").named("p");
        return null;
    }

    @Override
    public ResponseEntity<BaseResponse<Disposable>> saveMember(MemberDto memberDto) {
        Neo4jMember neo4jMember = new Neo4jMember(memberDto.getEmail(), memberDto.getName());
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(this.neo4jMemberRepository.save(neo4jMember).subscribe()));
    }
}

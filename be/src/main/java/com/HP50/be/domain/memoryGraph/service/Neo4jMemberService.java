package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberDto;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import com.HP50.be.global.common.BaseResponse;
import org.springframework.http.ResponseEntity;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;

public interface Neo4jMemberService {
    ResponseEntity<Flux<Neo4jMember>> getMember(String email);
    ResponseEntity<BaseResponse<Disposable>> saveMember(MemberDto memberDto);
}

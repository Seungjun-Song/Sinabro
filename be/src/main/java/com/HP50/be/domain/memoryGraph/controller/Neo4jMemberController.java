package com.HP50.be.domain.memoryGraph.controller;

import com.HP50.be.domain.memoryGraph.dto.MemberDto;
import com.HP50.be.domain.memoryGraph.service.Neo4jMemberServiceImpl;
import com.HP50.be.global.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.Disposable;

@RestController
@RequestMapping("/nMember")
@RequiredArgsConstructor
@Slf4j
public class Neo4jMemberController {
    private final Neo4jMemberServiceImpl neo4jMemberService;

    @PutMapping
    public ResponseEntity<BaseResponse<Disposable>> saveMember(@RequestBody MemberDto memberDto){
        log.debug("MemberDto= {}", memberDto);
        return this.neo4jMemberService.saveMember(memberDto);
    }
}

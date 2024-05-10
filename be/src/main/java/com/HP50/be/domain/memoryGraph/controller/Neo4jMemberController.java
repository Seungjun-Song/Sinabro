package com.HP50.be.domain.memoryGraph.controller;

import com.HP50.be.domain.memoryGraph.dto.MemberDto;
import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import com.HP50.be.domain.memoryGraph.service.Neo4jMemberServiceImpl;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.Disposable;

import java.util.List;

@RestController
@RequestMapping("/nMember")
@RequiredArgsConstructor
@Slf4j
public class Neo4jMemberController {
    private final Neo4jMemberServiceImpl neo4jMemberService;

    @PutMapping
    public ResponseEntity<BaseResponse<StatusCode>> saveMember(@RequestBody MemberDto memberDto){
        log.debug("MemberDto= {}", memberDto);
        this.neo4jMemberService.saveMember(memberDto);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "Neo4j 멤버 삭제")
    @DeleteMapping("/{memberId}")
    public ResponseEntity<BaseResponse<StatusCode>> deleteMember(@PathVariable Integer memberId){
        neo4jMemberService.deleteMember(memberId);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "모든 멤버 출력")
    @GetMapping
    public ResponseEntity<BaseResponse<List<MemberDto>>> findAllMember(){
        return ResponseEntity.ok().body(new BaseResponse<>(neo4jMemberService.findAllMembers()));
    }
}

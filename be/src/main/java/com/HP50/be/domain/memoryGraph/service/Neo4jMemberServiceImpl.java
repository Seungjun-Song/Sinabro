package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberDto;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Neo4jMemberServiceImpl implements Neo4jMemberService{

    private final Neo4jMemberRepository neo4jMemberRepository;

    @Override
    public List<MemberDto> findAllMembers() {
        List<MemberDto> memberDtoList = neo4jMemberRepository.findAll().stream()
                .map(member -> MemberDto.builder()
                        .memberId(member.getMemberId())
                        .name(member.getName())
//                        .to(member.getMemos())
                        .build()).toList();
        return memberDtoList;
    }

    @Override
    public Neo4jMember findMember(Integer memberId) {
        return null;
    }

    @Override
    public void saveMember(MemberDto memberDto) {
        Neo4jMember neo4jMember = Neo4jMember.builder()
                .memberId(memberDto.getMemberId())
                .name(memberDto.getName())
                .build();
        this.neo4jMemberRepository.save(neo4jMember);
    }

    @Override
    public void deleteMember(Integer memberId) {
//        neo4jMemberRepository.deleteById(memberId);
    }
}

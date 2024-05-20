package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberDto;
import com.HP50.be.domain.memoryGraph.dto.MemberForGraphDto;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;

import java.util.List;

public interface Neo4jMemberService {
    List<MemberForGraphDto> findAllMembers();

    MemberForGraphDto findMemoByMember(Integer memberId);

    void saveMember(MemberDto memberDto);

    void deleteMember(Integer memberId);
}

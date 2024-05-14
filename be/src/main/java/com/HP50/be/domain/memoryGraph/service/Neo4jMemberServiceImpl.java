package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.memoryGraph.dto.*;
import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.el.lang.ExpressionBuilder;
import org.neo4j.cypherdsl.core.Node;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class Neo4jMemberServiceImpl implements Neo4jMemberService{

    private final Neo4jMemberRepository neo4jMemberRepository;

    @Override
    public List<MemberForGraphDto> findAllMembers() {
        List<Neo4jMember> Members = neo4jMemberRepository.findAll();

        List<NodesDto> nodeList;
        List<LinksDto> linkList;
        List<MemberForGraphDto> memberForGraphDtoList = new ArrayList<>();

        for(Neo4jMember member: Members){
            nodeList = new ArrayList<>();
            linkList = new ArrayList<>();
            for(Memo memo: member.getMemos()){
                nodeList.add(NodesDto.builder()
                                .id(memo.getMemoId())
                                .label(memo.getTitle())
                        .build());
                setFromForLink(memo, memo.getMemoId(), linkList);
                setFromForNode(memo, nodeList);
            }
            memberForGraphDtoList.add(MemberForGraphDto.builder()
                            .memberId(member.getMemberId())
                            .name(member.getName())
                            .linkList(linkList)
                            .nodeList(nodeList)
                    .build());
        }

        return memberForGraphDtoList;
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

    public void setFromForLink(Memo memo, String memoId, List<LinksDto> linkList){
        for(Memo parMemo: memo.getFrom()){
            linkList.add(LinksDto.builder()
                            .source(parMemo.getMemoId())
                            .target(memoId)
                    .build());
            setFromForLink(parMemo, parMemo.getMemoId(), linkList);
        }
    }

    public void setFromForNode(Memo memo, List<NodesDto> nodeList){
        for(Memo parMemo: memo.getFrom()){
            nodeList.add(NodesDto.builder()
                    .id(parMemo.getMemoId())
                    .label(parMemo.getTitle())
                    .content(parMemo.getContent())
                    .build());
            setFromForNode(parMemo, nodeList);
        }
    }
}

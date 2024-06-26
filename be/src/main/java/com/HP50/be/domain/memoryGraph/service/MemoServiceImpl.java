package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.*;
import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import com.HP50.be.domain.memoryGraph.repository.MemoCustomRepository;
import com.HP50.be.domain.memoryGraph.repository.MemoRepository;
import com.HP50.be.domain.memoryGraph.repository.Neo4jMemberRepository;
import com.HP50.be.global.jwt.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class MemoServiceImpl implements MemoService {
    private final MemoRepository memoRepository;
    private final Neo4jMemberRepository neo4jMemberRepository;
    private final MemoCustomRepository memoCustomRepository;
    private final JwtUtil jwtUtil;

    @Override
    public MemberForGraphDto findMemoByMemberId(Integer memberId){
        Neo4jMember neo4jMember = neo4jMemberRepository.findNeo4jMemberByMemberId(memberId);

        // 리액트에 시각화 하기 위해서는 데이터가 Nodes 와 Links 로 전달되어서 가야함
        List<NodesDto> nodeList = new ArrayList<>();
        List<LinksDto> linkList = new ArrayList<>();

            for(Memo memo: neo4jMember.getMemos()){
                nodeList.add(NodesDto.builder()
                        .id(memo.getMemoId())
                        .label(memo.getTitle())
                        .content(memo.getContent())
                        .color(memo.getColor())
                        .build());
                setFromForLink(memo, memo.getMemoId(), linkList);
                setFromForNode(memo, nodeList);
            }

        return MemberForGraphDto.builder()
                .memberId(neo4jMember.getMemberId())
                .name(neo4jMember.getName())
                .linkList(linkList)
                .nodeList(nodeList)
                .build();
    }

    @Override
    public String saveMemo(String token, MemoRequestDto memoRequestDto) {
        Memo memo = Memo.builder()
                .title(memoRequestDto.getTitle())
                .content(memoRequestDto.getContent())
                .color(memoRequestDto.getColor())
                        .build();

        Memo savedMemo = memoRepository.save(memo);


        Integer memberId = jwtUtil.getMemberId(token);
        String memoId = savedMemo.getMemoId();

        memoCustomRepository.onlyMemoSave(memberId, memoId);

        return memoId;
    }

    @Override
    public void setMemoToMemo(String token, String firstMemoId, String secondMemoId) {
        Integer memberId = jwtUtil.getMemberId(token);
        memoCustomRepository.setMemoToMemoRelationShip(memberId, firstMemoId, secondMemoId);
    }

    // 지우고 나서 연관되어 있는 노드들의 관계의 갯수를 센 후 관계의 수가 1인 노드를 다시 멤버에 연결하는 작업 필요
    @Override
    public void deleteMemo(String token, String memoId) {
        memoCustomRepository.deleteMemo(token, memoId);
    }

    @Override
    public void updateMemo(MemoRequestDto memoRequestDto) {
        memoCustomRepository.updateMemo(memoRequestDto);
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
                    .color(parMemo.getColor())
                    .build());
            setFromForNode(parMemo, nodeList);
        }
    }
}

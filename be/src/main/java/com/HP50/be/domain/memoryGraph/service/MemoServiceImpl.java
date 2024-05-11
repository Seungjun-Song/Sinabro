package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemoDto;
import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.repository.MemoCustomRepository;
import com.HP50.be.domain.memoryGraph.repository.MemoRepository;
import com.HP50.be.global.jwt.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class MemoServiceImpl implements MemoService {
    private final MemoRepository memoRepository;
    private final MemoCustomRepository memoCustomRepository;
    private final JwtUtil jwtUtil;
    private final Driver driver;

    public List<Memo> findAll(){return this.memoRepository.findAll();}

    @Override
    public void saveMemo(String token, MemoDto memoDto) {
        Memo memo = Memo.builder()
                .title(memoDto.getTitle())
                .content(memoDto.getContent())
                        .build();

        Memo savedMemo = memoRepository.save(memo);


        Integer memberId = jwtUtil.getMemberId(token);
        String memoId = savedMemo.getMemoId();

        memoCustomRepository.onlyMemoSave(memberId, memoId);

    }

    @Override
    public void setMemoToMemo(String token, String firstMemoId, String secondMemoId) {
        Integer memberId = jwtUtil.getMemberId(token);
        memoCustomRepository.setMemoToMemoRelationShip(memberId, firstMemoId, secondMemoId);
    }

    // 지우고 나서 연관되어 있는 노드들의 관계의 갯수를 센 후 관계의 수가 1인 노드를 다시 멤버에 연결하는 작업 필요
    @Override
    public void deleteMemo(String memoId) {
        try(Session session = driver.session()){
            String cypher = memoCustomRepository.deleteMemo(memoId);
            session.run(cypher);
        }
    }

    @Override
    public void updateMemo(MemoDto memoDto) {
        try(Session session = driver.session()){
            String cypher = memoCustomRepository.updateMemo(memoDto);
            session.run(cypher);
        }
    }
}

package com.HP50.be.domain.memoryGraph.repository;

import com.HP50.be.domain.memoryGraph.dto.MemoRequestDto;
import com.HP50.be.domain.memoryGraph.dto.MemoResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.neo4j.cypherdsl.core.Cypher;
import org.neo4j.cypherdsl.core.Node;
import org.neo4j.cypherdsl.core.Statement;
import org.neo4j.cypherdsl.core.renderer.Renderer;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Repository;



@Slf4j
@Transactional
@Repository
@RequiredArgsConstructor
public class MemoCustomRepositoryImpl implements MemoCustomRepository{
    private final Neo4jClient neo4jClient;


    // 처음 메모를 저장할때 이 메모가 유저의 것이다 라는 것을 저장하기 위해서 관계를 같이 저장해줌
    @Override
    public void onlyMemoSave(Integer memberId, String memoId) {

        Node member = Cypher.node("Member").named("m");
        Node memo = Cypher.node("Memo").named("me");

        Statement query = Cypher.match(member)
                .where(member.property("member_id").isEqualTo(Cypher.literalOf(memberId)))
                .match(memo)
                .where(memo.property("memo_id").isEqualTo(Cypher.literalOf(memoId)))
                .create(member.relationshipTo(memo, "out_going"))
                .returning(member, memo)
                .build();


        neo4jClient.query(Renderer.getDefaultRenderer().render(query)).run();
    }

    // 메모와 메모의 관계를 정의해줄때 기존에 있던 멤버와의 관계를 끊어줌
    @Override
    public void setMemoToMemoRelationShip(Integer memberId, String firstMemoId, String secondMemoId) {
        Node member = Cypher.node("Member").named("m");
        Node memo1 = Cypher.node("Memo").named("m1");
        Node memo2 = Cypher.node("Memo").named("m2");

        Statement query = Cypher
                .match(memo1)
                    .where(memo1.property("memo_id").isEqualTo(Cypher.literalOf(firstMemoId)))
                .match(memo2)
                    .where(memo2.property("memo_id").isEqualTo(Cypher.literalOf(secondMemoId)))
                .match(member)
                    .where(member.property("member_id").isEqualTo(Cypher.literalOf(memberId)))
                        .match(member.relationshipBetween(memo2).named("rel"))
                    .delete("rel")
                        .create(memo1.relationshipTo(memo2, "out_going"))
                .returning(memo1, memo2)
                .build();

        neo4jClient.query(Renderer.getDefaultRenderer().render(query)).run();
    }

    @Override
    public String deleteMemo(String memoId) {
        return Cypher.match(Cypher.node("Memo").named("memo")
                .withProperties("memo_id", Cypher.literalOf(memoId)))
                .detachDelete("memo").build().getCypher();
    }

    @Override
    public String updateMemo(MemoRequestDto memoRequestDto) {
        String memoId = memoRequestDto.getMemoId();
        String title = memoRequestDto.getTitle();
        String content = memoRequestDto.getContent();
        String color = memoRequestDto.getColor();

        Node memo = Cypher.node("Memo").named("m");

        return Cypher
                .match(memo
                        .withProperties("memo_id", Cypher.literalOf(memoId)))
                .set(
                        memo.property("title").to(Cypher.literalOf(title)),
                        memo.property("content").to(Cypher.literalOf(content)),
                        memo.property("color").to(Cypher.literalOf(color))
                )
                .build()
                .getCypher();
    }
}

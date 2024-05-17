package com.HP50.be.domain.memoryGraph.repository;

import com.HP50.be.domain.memoryGraph.dto.MemoRequestDto;
import com.HP50.be.global.jwt.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.neo4j.cypherdsl.core.*;
import org.neo4j.cypherdsl.core.renderer.Renderer;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static org.neo4j.cypherdsl.core.Cypher.*;


@Slf4j
@Transactional
@Repository
@RequiredArgsConstructor
public class MemoCustomRepositoryImpl implements MemoCustomRepository{
    private final Neo4jClient neo4jClient;
    private final Driver driver;
    private final JwtUtil jwtUtil;

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
    public void deleteMemo(String token, String memoId) {
        Integer memberId = jwtUtil.getMemberId(token);

        try(Session session = driver.session()){
            Node m = Cypher.node("Memo").named("m");
            Node n = Cypher.anyNode("n");
            Node member = Cypher.node("Member").named("member");

            Relationship r = m.relationshipTo(n);

            Statement memoDeleteCypher = Cypher.match(Cypher.node("Memo").named("memo")
                            .withProperties("memo_id", Cypher.literalOf(memoId)))
                    .detachDelete("memo").build();

            Statement statement = Cypher.match(r)
                    .where(m.property("memo_id").isEqualTo(Cypher.literalOf(memoId)))
                    .with(n, count(n).as("count"))
                    .where(Cypher.name("count").isEqualTo(Cypher.literalOf(1)))
                    .returning(n.property("memo_id"))
                    .build();

            List<String> memoIdList = new ArrayList<>();

            Result result = session.run(statement.getCypher());

            while (result.hasNext()) {
                Record record = result.next();
                memoIdList.add(record.get("n.memo_id").asString());
            }

//             메모를 삭제하면 유저와 관계가 사라지기 때문에 다시 유저와 관계를 정의
            for(String connectMemoId: memoIdList){
                Node connectMemo = Cypher.node("Memo").named("m");
                Statement connectMemoToMemberCypher = Cypher
                        .match(connectMemo.withProperties("memo_id", Cypher.literalOf(connectMemoId)))
                        .match(member.withProperties("member_id", Cypher.literalOf(memberId)))
                                .create(member.relationshipTo(connectMemo, "out_going"))
                                        .build();

                log.info("삭제 Cypher: {}", connectMemoToMemberCypher.getCypher());

                neo4jClient.query(Renderer.getDefaultRenderer().render(connectMemoToMemberCypher)).run();
            }

            // memo 삭제
            neo4jClient.query(Renderer.getDefaultRenderer().render(memoDeleteCypher)).run();
        }
    }

    @Override
    public void updateMemo(MemoRequestDto memoRequestDto) {
        try(Session session = driver.session()){
            String memoId = memoRequestDto.getMemoId();
            String title = memoRequestDto.getTitle();
            String content = memoRequestDto.getContent();
            String color = memoRequestDto.getColor();

            Node memo = Cypher.node("Memo").named("m");

            String cypher = Cypher
                    .match(memo
                            .withProperties("memo_id", Cypher.literalOf(memoId)))
                    .set(
                            memo.property("title").to(Cypher.literalOf(title)),
                            memo.property("content").to(Cypher.literalOf(content)),
                            memo.property("color").to(Cypher.literalOf(color))
                    )
                    .build()
                    .getCypher();

            session.run(cypher);
        }
    }
}

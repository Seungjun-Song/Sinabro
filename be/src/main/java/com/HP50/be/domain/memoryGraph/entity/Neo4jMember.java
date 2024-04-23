package com.HP50.be.domain.memoryGraph.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

// Neoj4에서는 Entity가 아닌 Node라고 기입

@Getter
@AllArgsConstructor
@Builder
@Node("Member")
public class Neo4jMember {
    @Id
    private String email;

    // memo라는 관계를 가진 나에게서 뻗어나가는 메모를 출력
//    @Relationship(type = "memo", direction = Relationship.Direction.OUTGOING)
//    private List<Memo> memos;

}

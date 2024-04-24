package com.HP50.be.domain.memoryGraph.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;


@Getter
@AllArgsConstructor
@Builder
@Node("Memo")
public class Memo {
    @Id
    private final String title;
    private final String content;

    @Relationship(type = "in_coming", direction = Relationship.Direction.INCOMING)
    private List<Memo> from;

    // memo라는 관계를 가진 나에게서 뻗어나가는 메모를 출력
    @Relationship(type = "out_going", direction = Relationship.Direction.OUTGOING)
    private List<Memo> to;

}

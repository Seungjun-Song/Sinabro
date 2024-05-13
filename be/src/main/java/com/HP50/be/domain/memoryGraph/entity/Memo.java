package com.HP50.be.domain.memoryGraph.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.util.List;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Node("Memo")
public class Memo {

    @Id @GeneratedValue(UUIDStringGenerator.class) @Property(name = "memo_id")
    private String memoId;

    @Property
    private String title;

    @Property
    private String content;

    // 메모와 메모 간의 관계에서 나에게서 뻗어나가는 메모
    @Relationship(type = "out_going", direction = Relationship.Direction.OUTGOING)
    private List<Memo> from;
}

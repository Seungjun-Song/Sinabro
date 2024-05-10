package com.HP50.be.domain.memoryGraph.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.neo4j.core.schema.*;

import java.util.List;


@Getter
@AllArgsConstructor
@Builder
@Node("Memo")
public class Memo {

    @Id
    private Integer identity ;

    @Property
    private String title;

    @Property
    private String content;

    // 메모와 메모 간의 관계에서 나에게서 뻗어나가는 메모
    @Relationship(type = "out_going", direction = Relationship.Direction.OUTGOING)
    private List<Memo> from;
}

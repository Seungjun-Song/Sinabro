package com.HP50.be.domain.memoryGraph.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;


@Getter
@AllArgsConstructor
@Builder
@Node("Memo")
public class Memo {
    @Id
    private final String title;
    private final String content;

}

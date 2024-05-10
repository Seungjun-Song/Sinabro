package com.HP50.be.domain.memoryGraph.entity;

import lombok.*;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

// Neoj4에서는 Entity가 아닌 Node라고 기입

@Data
@Builder
@Node("Member")
public class Neo4jMember {
    @Id
    @Property("member_id")
    private String memberId;

    @Property
    private String name;

    @Relationship(type = "out_going", direction = Relationship.Direction.OUTGOING)
    private List<Memo> memos;

}

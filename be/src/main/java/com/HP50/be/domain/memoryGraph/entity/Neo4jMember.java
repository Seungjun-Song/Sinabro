package com.HP50.be.domain.memoryGraph.entity;

import lombok.*;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.util.List;

// Neoj4에서는 Entity가 아닌 Node라고 기입

@Data
@Builder
@Node("Member")
public class Neo4jMember {

    @Id @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    @Property(name = "member_id")
    private Integer memberId;

    @Property
    private String name;

    @Relationship(type = "out_going", direction = Relationship.Direction.OUTGOING)
    private List<Memo> memos;



}

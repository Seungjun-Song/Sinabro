package com.HP50.be.domain.memoryGraph.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

// Neoj4에서는 Entity가 아닌 Node라고 기입

@Getter
@AllArgsConstructor
@Builder
@ToString
@Node("Member")
public class Neo4jMember {
    @Id
    @Property
    private String email;
    @Property
    private String name;
    // memo라는 관계를 가진 나에게서 뻗어나가는 메모를 출력
    @Relationship(type = "out_going", direction = Relationship.Direction.OUTGOING)
    private List<Memo> to;

    public Neo4jMember(String email, String name){
        this.email = email;
        this.name = name;
    }
}

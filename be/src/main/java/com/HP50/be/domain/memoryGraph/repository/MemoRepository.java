package com.HP50.be.domain.memoryGraph.repository;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.support.CypherdslStatementExecutor;

// neo4j의 repo 는 reactive 하기 때문에 Mono, Flux 와 같은 리턴 타입을 가짐
// ReactiveNeo4jRepository 를 사용
public interface MemoRepository extends Neo4jRepository<Memo, String>, CypherdslStatementExecutor<Memo> {
}

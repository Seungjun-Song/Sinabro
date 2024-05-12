package com.HP50.be.domain.memoryGraph.repository;

import com.HP50.be.domain.memoryGraph.dto.MemoDto;
import org.neo4j.cypherdsl.core.Node;
import org.neo4j.cypherdsl.core.Statement;
import org.neo4j.driver.summary.ResultSummary;

import java.util.List;

public interface MemoCustomRepository {
    void onlyMemoSave(Integer memberId, String memoId);
    void setMemoToMemoRelationShip(Integer memberId, String firstMemoId, String secondMemoId);
    String deleteMemo(String memoId);
    String updateMemo(MemoDto memoDto);
}

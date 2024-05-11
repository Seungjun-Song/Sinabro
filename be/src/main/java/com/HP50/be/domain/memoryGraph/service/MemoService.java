package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemoDto;
import com.HP50.be.domain.memoryGraph.entity.Memo;
import reactor.core.publisher.Flux;

import java.util.List;

public interface MemoService {
    List<Memo> findAll();
    void saveMemo(String token, MemoDto memoDto);
    void setMemoToMemo(String token, String firstMemoId, String secondMemoId);
    void deleteMemo(String memoId);
    void updateMemo(MemoDto memoDto);
}

package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberForGraphDto;
import com.HP50.be.domain.memoryGraph.dto.MemoDto;

import java.util.List;

public interface MemoService {
    MemberForGraphDto findMemoByMemberId(Integer memberId);
    void saveMemo(String token, MemoDto memoDto);
    void setMemoToMemo(String token, String firstMemoId, String secondMemoId);
    void deleteMemo(String memoId);
    void updateMemo(MemoDto memoDto);
}

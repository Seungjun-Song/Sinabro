package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberForGraphDto;
import com.HP50.be.domain.memoryGraph.dto.MemoRequestDto;
import com.HP50.be.domain.memoryGraph.dto.MemoResponseDto;

public interface MemoService {
    MemberForGraphDto findMemoByMemberId(Integer memberId);
    void saveMemo(String token, MemoResponseDto memoResponseDto);
    void setMemoToMemo(String token, String firstMemoId, String secondMemoId);
    void deleteMemo(String memoId);
    void updateMemo(MemoRequestDto memoRequestDto);
}

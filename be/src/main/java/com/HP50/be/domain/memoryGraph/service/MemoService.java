package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.dto.MemberForGraphDto;
import com.HP50.be.domain.memoryGraph.dto.MemoRequestDto;
import com.HP50.be.domain.memoryGraph.dto.MemoResponseDto;

public interface MemoService {
    MemberForGraphDto findMemoByMemberId(Integer memberId);
    String saveMemo(String token, MemoRequestDto memoRequestDto);
    void setMemoToMemo(String token, String firstMemoId, String secondMemoId);
    void deleteMemo(String memoId);
    void updateMemo(MemoRequestDto memoRequestDto);
}

package com.HP50.be.domain.member.service;

import com.HP50.be.domain.member.dto.SearchMemberResponseDto;

import java.util.List;

public interface MemberService {
    SearchMemberResponseDto searchMember(String keyword, int page);

}

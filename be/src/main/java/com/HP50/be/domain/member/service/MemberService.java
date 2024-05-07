package com.HP50.be.domain.member.service;

import com.HP50.be.domain.member.dto.ProfileResponseDto;
import com.HP50.be.domain.member.dto.SearchMemberResponseDto;
import com.HP50.be.domain.member.entity.Member;

public interface MemberService {
    SearchMemberResponseDto searchMember(String keyword, int page);
    ProfileResponseDto findMemberProfile(Integer memberId);
}

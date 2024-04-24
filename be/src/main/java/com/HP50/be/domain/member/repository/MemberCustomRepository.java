package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Map;

public interface MemberCustomRepository {
    public Map<Integer, Member> getMembersMap(List<Integer> idList);
    public Slice<Member> searchMember(String keyword, Pageable pageable);

}

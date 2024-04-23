package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.dto.PjtTechInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.HP50.be.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public Map<Integer, Member> getMembersMap(List<Integer> idList) {
        List<Member> result = queryFactory.select(member)
                .from(member)
                .where(member.memberId.in(idList))
                .fetch();
        return result.stream().collect(Collectors.toMap(Member::getMemberId, member -> member));
    }
}

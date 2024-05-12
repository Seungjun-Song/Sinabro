package com.HP50.be.domain.member.repository;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.dto.PjtTechInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.HP50.be.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
@Transactional
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

    @Override
    public Slice<Member> searchMember(String keyword, Pageable pageable) {
        // 요청 페이지보다 하나 더 많이 요청하여 다음 페이지 존재 여부 확인
        var query = queryFactory.selectFrom(member)
                .where(member.memberName.likeIgnoreCase("%" + keyword + "%"))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1); // 다음 페이지 존재 여부를 위해 한 개 더 불러옴

        List<Member> results = query.fetch();
        boolean hasNext = results.size() > pageable.getPageSize();

        // 결과 목록이 요청된 페이지 크기보다 클 경우, 마지막 항목 제거
        List<Member> members = hasNext ? results.subList(0, pageable.getPageSize()) : results;
        return new SliceImpl<>(members, pageable, hasNext);
    }

    @Override
    public void updateProfileImage(Integer memberId, String newImage) {
        queryFactory
                .update(member)
                .where(member.memberId.eq(memberId))
                .set(member.memberImg, newImage)
                .execute();
    }
}

package com.HP50.be.domain.port.repository;

import com.HP50.be.domain.port.entity.Port;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.HP50.be.domain.port.entity.QPort.port;

@Repository
@RequiredArgsConstructor
public class PortCustomRepositoryImpl implements PortCustomRepository {
    private final JPAQueryFactory queryFactory;
    @Override
    public Port getUnUse() {
        return queryFactory.selectFrom(port)
                .where(port.portUse.eq(false))
                .fetchFirst();
    }

    @Override
    public Port findExistingPortByMemberId(Integer memberId) {
        return queryFactory.selectFrom(port)
                .where(port.member.memberId.eq(memberId))
                .fetchFirst();
    }
}

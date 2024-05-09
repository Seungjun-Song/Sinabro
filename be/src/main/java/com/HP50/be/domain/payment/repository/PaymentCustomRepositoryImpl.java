package com.HP50.be.domain.payment.repository;

import com.HP50.be.domain.payment.entity.Payment;
import com.HP50.be.domain.payment.entity.PaymentStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.HP50.be.domain.payment.entity.QPayment.payment;

@Repository
@RequiredArgsConstructor
@Transactional
public class PaymentCustomRepositoryImpl implements PaymentCustomRepository{
    private final JPAQueryFactory queryFactory;
    @Override
    public boolean checkPaid(int projectId) {
        Payment paid = queryFactory.select(payment)
                .from(payment)
                .where(payment.project.projectId.eq(projectId)
                        .and(payment.paymentStatus.eq(PaymentStatus.OK)))
                .fetchOne();
        return paid != null;
    }

    @Override
    public Payment getCheckPaid(int projectId) {
        return queryFactory.select(payment)
                .from(payment)
                .where(payment.project.projectId.eq(projectId)
                        .and(payment.paymentStatus.eq(PaymentStatus.OK)))
                .fetchOne();
    }
}

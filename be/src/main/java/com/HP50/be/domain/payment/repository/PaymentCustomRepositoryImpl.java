package com.HP50.be.domain.payment.repository;

import com.HP50.be.domain.payment.dto.PaidResponseDto;
import com.HP50.be.domain.payment.entity.Payment;
import com.HP50.be.domain.payment.entity.PaymentStatus;
import com.HP50.be.domain.payment.entity.QPayment;
import com.querydsl.core.types.Projections;
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
        Payment payment = queryFactory.select(QPayment.payment)
                .from(QPayment.payment)
                .where(QPayment.payment.project.projectId.eq(projectId))
                .fetchOne();
        return payment!=null;
    }

    @Override
    public PaidResponseDto getCheckPaid(int projectId) {
        return queryFactory.select(
                        Projections.constructor(
                                PaidResponseDto.class,
                                payment.updatedDttm.as("paidDateTime"),
                                payment.paymentAmount.as("paymentAmount"),
                                payment.paymentCard.as("paymentCard"),
                                payment.paymentMethod.as("paymentMethod")
                        )
                )
                .from(payment)
                .where(payment.project.projectId.eq(projectId)
                        .and(payment.paymentStatus.eq(PaymentStatus.OK)))
                .fetchOne();
    }
}

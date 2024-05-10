package com.HP50.be.domain.payment.repository;

import com.HP50.be.domain.payment.dto.PaidResponseDto;
import com.HP50.be.domain.payment.entity.Payment;

public interface PaymentCustomRepository {
    boolean checkPaid(int projectId);
    PaidResponseDto getCheckPaid(int projectId);
}

package com.HP50.be.domain.payment.service;

import com.HP50.be.domain.payment.dto.PaymentResponseDto;

public interface PaymentService {
    PaymentResponseDto requestPayment(int memberId, int projectId, int paymentAmount);
}

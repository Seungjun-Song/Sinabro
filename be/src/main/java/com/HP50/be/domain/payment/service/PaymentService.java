package com.HP50.be.domain.payment.service;

import com.HP50.be.domain.payment.dto.PaymentResponseDto;
import com.HP50.be.domain.payment.dto.PaymentValidateDto;

public interface PaymentService {
    PaymentResponseDto requestPayment(int memberId, int projectId, int paymentAmount);
    Boolean validatePayment(int memberId,PaymentValidateDto dto);
}

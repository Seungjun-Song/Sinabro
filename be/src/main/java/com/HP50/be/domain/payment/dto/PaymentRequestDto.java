package com.HP50.be.domain.payment.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {
    Integer projectId;
    Integer paymentAmount;//금액
}

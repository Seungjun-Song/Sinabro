package com.HP50.be.domain.payment.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponseDto {
    String memberName;
    String memberEmail;
}

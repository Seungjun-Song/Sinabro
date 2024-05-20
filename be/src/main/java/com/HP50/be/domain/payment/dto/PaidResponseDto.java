package com.HP50.be.domain.payment.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaidResponseDto {
    LocalDateTime paidDateTime;
    Integer paymentAmount;
    String paymentCard;
    String paymentMethod;
}

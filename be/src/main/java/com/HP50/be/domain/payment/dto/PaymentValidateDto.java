package com.HP50.be.domain.payment.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentValidateDto {
    String paymentImpUid;//결제 진행한 imp Uid(imp_uid)
    String paymentPayMethod; //어떤 걸로 결제 ? (pay_method)
    Integer paymentAmount;//가격 (paid_amount)
    String status;//상태 (status)
    String paymentCard;//카드 이름 (card_name)
    String paymentMemberEmail;//(buyer_email)
}

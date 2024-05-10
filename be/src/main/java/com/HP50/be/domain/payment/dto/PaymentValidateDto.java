package com.HP50.be.domain.payment.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentValidateDto {
    Integer projectId;//프로젝트 ID
    String paymentImpUid;//결제 진행한 imp Uid(imp_uid)
}

package com.HP50.be.domain.payment.entity;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.entity.Project;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId; //자체 생성 ID

    @Column
    private Integer paymentAmount; //결제 금액

    @Column
    private String paymentCard; //카드 이름

    @Column
    private String paymentMethod; //결제 방식

    @Column
    private String paymentImpUid;//imp uid

    @Column
    private PaymentStatus paymentStatus; //상태

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDttm;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
}

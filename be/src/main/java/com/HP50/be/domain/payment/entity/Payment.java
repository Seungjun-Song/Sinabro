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
    private Integer paymentId;

    @Column
    private Integer paymentAmount;

    @Column
    private String paymentField;

    @Column
    private String paymentMethod;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDttm;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}

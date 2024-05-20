package com.HP50.be.domain.payment.repository;

import com.HP50.be.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    boolean existsByProject_ProjectId(Integer projectId);
    Payment findByProject_ProjectId(Integer projectId);
}

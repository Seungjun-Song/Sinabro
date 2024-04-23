package com.HP50.be.domain.payment.repository;

import com.HP50.be.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymenRepository extends JpaRepository<Payment, Integer> {
}

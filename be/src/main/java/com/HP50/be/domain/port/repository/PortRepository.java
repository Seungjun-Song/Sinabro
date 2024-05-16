package com.HP50.be.domain.port.repository;

import com.HP50.be.domain.port.entity.Port;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortRepository extends JpaRepository<Port,Integer> {
}

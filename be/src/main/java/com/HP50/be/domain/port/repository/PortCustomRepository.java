package com.HP50.be.domain.port.repository;

import com.HP50.be.domain.port.entity.Port;

import java.util.Optional;

public interface PortCustomRepository {
    public Port getUnUse();
}

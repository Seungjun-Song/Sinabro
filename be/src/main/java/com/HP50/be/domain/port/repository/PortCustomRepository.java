package com.HP50.be.domain.port.repository;

import com.HP50.be.domain.port.entity.Port;

public interface PortCustomRepository {
    Port getUnUse();
    Port findExistingPortByMemberId(Integer memberId);
}

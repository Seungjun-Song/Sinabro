package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import reactor.core.publisher.Flux;

public interface MemoService {
    Flux<Memo> findAll();
}

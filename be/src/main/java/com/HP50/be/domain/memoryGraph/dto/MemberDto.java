package com.HP50.be.domain.memoryGraph.dto;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import lombok.Builder;
import lombok.Data;
import reactor.core.publisher.Flux;

@Data
@Builder
public class MemberDto {
    private String email;
    private String name;
    private Flux<Memo> to;

}

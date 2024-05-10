package com.HP50.be.domain.memoryGraph.dto;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemberDto {
    private String memberId;
    private String name;
    private List<Memo> to;
}

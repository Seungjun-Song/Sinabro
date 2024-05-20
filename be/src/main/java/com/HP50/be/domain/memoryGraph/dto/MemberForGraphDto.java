package com.HP50.be.domain.memoryGraph.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemberForGraphDto {
    private Integer memberId;
    private String name;
    // 데이터 시각화를 위해서 node와 link 로 표현
    List<NodesDto> nodeList;
    List<LinksDto> linkList;
}

package com.HP50.be.domain.memoryGraph.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GraphDataDto {
    List<NodesDto> nodeList;
    List<LinksDto> linkList;
}

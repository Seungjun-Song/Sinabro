package com.HP50.be.domain.memoryGraph.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LinksDto {
    private String source;
    private String target;
}

package com.HP50.be.domain.memoryGraph.dto;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemoDto {
    private final String title;

    private final String content;

    // 메모와 메모 간의 관계에서 나에게서 뻗어나가는 메모
    private List<Memo> from;

}

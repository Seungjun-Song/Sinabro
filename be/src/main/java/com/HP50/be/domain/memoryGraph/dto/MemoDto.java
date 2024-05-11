package com.HP50.be.domain.memoryGraph.dto;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemoDto {
    private String memoId;
    private String title;
    private String content;
}

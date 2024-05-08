package com.HP50.be.domain.community.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BoardPaginationResponseDto {
    Boolean hasNext;
    List<BoardListResponseDto> boardListResponseDto;
}

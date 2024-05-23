package com.HP50.be.domain.community.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;


@AllArgsConstructor
@Getter
public class SliceTotalCountDto<T> {
    private SliceImpl<T> slice;
    private long totalCount;
}

package com.HP50.be.domain.member.dto;

import lombok.*;

import java.util.List;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchMemberResponseDto {
    Integer page;
    Boolean hasNext;
    List<SearchMemberSimpleInfo> searchList;
}

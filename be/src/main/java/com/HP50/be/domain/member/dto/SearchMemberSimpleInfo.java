package com.HP50.be.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchMemberSimpleInfo {
    private Integer memberId;
    private String memberName;
    private String memberImg;
}

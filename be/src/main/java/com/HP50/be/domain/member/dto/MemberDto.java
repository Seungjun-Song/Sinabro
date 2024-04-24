package com.HP50.be.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* Getter, Setter
* ToString, EqualsAndHashCode
* RequiredArgsConstructor*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDto {
    // jwt payload에 들어갈 field
    private Integer memberId;
    private String memberEmail;
    private String memberName;

}

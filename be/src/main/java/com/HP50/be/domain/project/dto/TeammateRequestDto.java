package com.HP50.be.domain.project.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeammateRequestDto { //팀원 추가 & 삭제에서 사용
    Integer memberId;
    Integer categoryId;
    Integer projectId;
}

package com.HP50.be.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PjtTechInfo {
    Integer memberId;
    String subcategoryName;

    public PjtTechInfo(Integer memberId,  String subcategoryName) {
        this.memberId = memberId;
        this.subcategoryName = subcategoryName;
    }
}

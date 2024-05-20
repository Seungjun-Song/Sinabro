package com.HP50.be.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PjtTechInfo {
    Integer teammateId;
    String subcategoryName;

    public PjtTechInfo(Integer teammateId,  String subcategoryName) {
        this.teammateId = teammateId;
        this.subcategoryName = subcategoryName;
    }
}

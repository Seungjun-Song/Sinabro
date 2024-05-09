package com.HP50.be.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TeammateInfo {
    Integer teammateId;
    Integer memberId;
    String memberName;
    String memberImg;
    Boolean teamReader;
    String teammateRole;
    List<String> techStack;
    public TeammateInfo(Integer teammateId, Integer memberId, String memberName, String memberImg, Boolean teamReader,String teammateRole) {
        this.teammateId = teammateId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberImg = memberImg;
        this.teamReader = teamReader;
        this.techStack = new ArrayList<>();
        this.teammateRole = teammateRole;
    }

}

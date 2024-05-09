package com.HP50.be.domain.project.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueStatusDto {
    List<String> keyList;
    String issueStatus;
}

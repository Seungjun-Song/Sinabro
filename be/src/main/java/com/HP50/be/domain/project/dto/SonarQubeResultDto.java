package com.HP50.be.domain.project.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SonarQubeResultDto {
    Integer page; //현재 페이지
    Integer totalPage; //총 페이지 개수
    Integer effortTotal; // sonarQube가 도출한 이슈를 해결하는데 필요한 시간 ( 분 )
    Integer total; //총 이슈 개수
    List<IssueDto> issues; //이슈들

    public void addIssue(IssueDto issueDto){
        this.issues.add(issueDto);
    }

}

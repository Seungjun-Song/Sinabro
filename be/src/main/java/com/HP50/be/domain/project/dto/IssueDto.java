package com.HP50.be.domain.project.dto;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueDto {
    String rule;//이슈가 감지된 규칙의 ID. "java:S120" : Java 규칙 S120에 위배된 이슈
    /*
    BLOCKER: 시스템 운영에 매우 심각한 영향을 미칠 수 있는 버그나 문제를 지칭합니다. 예를 들어, 메모리 누수, 무한 루프 등이 이에 해당합니다.
    CRITICAL: 시스템에 심각한 영향을 미치지는 않지만, 수정되지 않으면 사용자에게 중대한 문제를 야기할 수 있는 버그나 문제입니다. 예를 들어, SQL 인젝션 같은 보안 취약점이 이에 해당할 수 있습니다.
    MAJOR: 애플리케이션의 기능에 영향을 미칠 수 있는 중요 버그나 문제입니다. 이는 종종 코드의 논리적 오류나 예상치 못한 동작을 포함합니다.
    MINOR: 사용성에 영향을 미치거나 코드 유지보수에 불편을 주는, 비교적 중요하지 않은 문제를 지칭합니다.
    INFO: 정보적인 목적으로 제공되는 내용으로, 버그나 실제 문제는 아니지만 개선할 여지가 있는 코드를 가리킬 수 있습니다.
     */
    String severity;//이슈의 심각도 수준 ( MINOR, BLOCKER, CRITICAL, MAJOR, INFO )
    String component;//문제가 발생한 파일이나 코드 요소
    Integer startLine;//시작라인 (textRange - startLine)
    Integer endLine;//끝라인
    Integer startOffset;//이슈가 발생한 줄의 시작
    Integer endOffset;//이슈가 발생한 줄의 끝
    String message;//이슈에 대한 설명 메시지
    Integer effort;//이슈를 해결하는 데 필요한 예상 시간 ( 분 )
    /*
    Bug: 프로그램이 의도한 대로 동작하지 않게 만드는 명백한 오류입니다. 버그는 종종 프로그램의 기능적인 부분에 직접적인 영향을 미칩니다.
    Vulnerability: 보안 취약점을 지칭하며, 이는 공격자가 시스템을 해칠 수 있는 기회를 제공할 수 있습니다. 취약점은 시스템의 보안을 약화시키고 데이터 유출이나 시스템 장애를 초래할 수 있습니다.
    Code Smell: 버그는 아니지만, 소프트웨어의 유지보수를 복잡하게 만들거나 미래의 오류 가능성을 높이는 코드의 문제점을 말합니다. 코드 스멜은 주로 코드의 가독성, 일관성, 단순성을 저하시키는 문제를 가리킵니다.
     */
    String type;//이슈의 유형 ( "CODE_SMELL", "BUG", "VULNERABILITY" )
    List<ImpactDto> impacts;//이 이슈가 소프트웨어 품질에 미치는 영향
    List<String> tags;//이슈에 관련된 태그
    String issueCode; //문제되는 코드
    //2024-05-09 추가
    String issueStatus; //이슈 상태
    String key;//이슈 키
}

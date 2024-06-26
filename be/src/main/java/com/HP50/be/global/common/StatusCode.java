package com.HP50.be.global.common;
import lombok.Getter;

@Getter
public enum StatusCode {
    // Success
    SUCCESS(true, 100, "요청에 성공하였습니다."),


    // COMMON
    FORBIDDEN_REQUEST(false, 202, "접근 권한이 없습니다."),
    BAD_REQUEST(false,203,"잘못된 요청방법입니다"),

    // Code ( Category, SubCategory )
    NOT_EXIST_SUB_CATEGORY(false,301,"해당하는 소분류가 없습니다."),
    NOT_EXIST_CATEGORY(false,301,"해당하는 대분류가 없습니다."),
    // TechStack ( 400 )
    NOT_EXIST_STACK(false, 401, "유저의 기술스택이 없습니다."),
    // TeamSpace ( 500)
    FAIL_CREATE_PROJECT(false,501,"프로젝트 생성에 실패했습니다."),
    NOT_EXIST_PROJECT(false,502,"해당하는 프로젝트가 없습니다."),
    FAIL_ADD_TEAMMATE(false,503,"팀원 추가에 실패했습니다."),
    FAIL_DELETE_TEAMMATE(false,504,"팀원 삭제에 실패했습니다."),
    FAIL_UPDATE_REPO(false, 505, "레포 수정에 실패했습니다"),
    NOT_TEAM_MEMBER(false,506,"요청한 유저가 해당 프로젝트의 팀원이 아닙니다"),
    DUPLICATE_PROJECT_TEAMMATE(false, 507, "중복된 팀원입니다."),
    EXCEED_PROJECT_TEAMMATE(false, 508, "프로젝트의 최대 인원을 초과했습니다."),


    // Member ( 600 )
    NOT_EXIST_MEMBER(false,601,"해당하는 멤버가 없습니다."),

    // Calender ( 700 )
    FAIL_CREATE_CALENDER(false, 701, "일정 추가에 실패했습니다"),
    NOT_EXIST_CALENDER(false,702,"해당하는 일정이 없습니다"),
    FAIL_UPDATE_CALENDER(false, 703, "일정 수정에 실패했습니다"),
    FAIL_DELETE_CALENDER(false, 704, "일정 삭제에 실패했습니다"),

    // Port (800) & Chat(830)
    NOT_EXIST_PORT(false,801,"지급할 수 있는 포트가 없습니다."),
    ALREADY_EXIST_CHAT(false,831,"이미 음성 채팅방이 존재합니다."),
    NOT_EXIST_CHAT(false,832,"음성 채팅방이 존재하지 않습니다."),
    ALREADY_EXIST_SESSION(false,833,"중복되는 세션입니다 ( UUID 중복 )"),
    FAIL_CREATE_ROOM(false,834,"음성 채팅방 생성에 실패했습니다. ( UUID 중복 )"),
    NOT_EXIST_SESSION(false,835,"세션이 DB에는 존재하지만, 오픈비두에는 존재하지 않습니다."),
    FAIL_CONNECT_SESSION(false,836,"세션 연결에 실패했습니다.( 방 연결 실패 )"),
    FAIL_DELETE_SESSION(false,837,"세션 삭제에 실패했습니다"),
    SUCCESS_EXIT_CHAT(true,838,"성공적으로 방을 나왔습니다"),

    // Token (900)
    INVALID_TOKEN(false, 901, "기존 서명을 확인할 수 없습니다."),
    DAMAGED_ACCESS_TOKEN(false, 902, "올바르게 구성된 JWT 토큰이 아닙니다."),
    EXPIRED_ACCESS_TOKEN(false, 903, "토큰이 만료되었습니다."),
    UNSUPPORTED_ACCESS_TOKEN(false, 904, "지원하지 않는 토큰입니다."),
    INVALID_NULL_TOKEN(false, 905, "토큰 값 자체가 유효하지 않습니다."),
    ILLEGAL_ARGUMENT_TOKEN(false, 906, "JWT claims이 비어있는 상태입니다."),
    TOKEN_NOT_FOUND(false, 907, "다시 로그인 해주세요."),


    //SonarQube(1000)
    FAIL_SONAR_CLONE(false, 1001,"정적분석 git clone이 실패했습니다."),
    FAIL_SONAR(false, 1002,"정적분석에 실패했습니다."),
    FAIL_SONAR_COMMAND(false, 1003,"정적분석 명령에 실패했습니다."),
    FAIL_DELETE_REPO(false,1004,"정적분석 레포 삭제에 실패했습니다."),
    FAIL_CHMOD_REPO(false,1005,"깃 파일 권한 설정에 실패했습니다."),
    FAIL_BUILD_REPO(false,1006,"깃 파일 권한 빌드에 실패했습니다."),
    FAIL_API_REQUEST(false,1007,"소나큐브 API요청을 실패했습니다."),
    REQUIRE_PAYMENT(false,1008,"소나큐브를 이용하기 위해선 결제가 필요합니다."),
    RUNNING_SONARQUBE(false,1009,"소나큐브가 작동중입니다. 잠시 후 요청을 다시 보내주세요."),
    
    // Community(1100)
    NOT_EXIST_BOARD(false, 1101, "존재하지 않는 게시글입니다"),
    //Payment(1200)
    ALREADY_PAID(false,1201,"이미 결제한 프로젝트입니다."),
    FAIL_SAVE_PAYMENT(false,1202,"결제 정보 저장에 실패했습니다."),
    NOT_EQUAL_MEMBER(false,1203,"결제를 신청한 멤버와 실제 결제를 진행한 멤버가 다른 멤버입니다."),
    NOT_EXIST_PAYMENT(false,1204,"결제 정보가 존재하지 않습니다"),
    NOT_EQUAL_ACOUNT(false,1205,"결제 금액이 일치하지 않습니다"),
    STATUS_IS_NOT_PAID(false,1206,"결제 상태가 알맞지 않습니다"),
    FAIL_VALIDATE_PAYMENT(false, 1207, "결제 검증에 실패했습니다"),
    NOT_EXIST_PORTONE(false, 1208,"포트원에서 존재하지 않는 결제건입니다"),
    FAIL_PORTONE_RESPONSE(false, 1209,"포트원에서 결제건에 대한 요청을 실패했습니다."),
    // Jsch (1500)
    SESSION_CONNECT_FAIL(false, 1500, "Session 접속 실패"),
    CHANNEL_CONNECT_FAIL(false, 1501, "Channel 접속 실패"),
    STREAM_HANDLING_FAIL(false, 1502, "Stream 처리 실패"),
    CONTAINER_RUN_FAIL(false, 1503, "Container 실행 실패"),
    THREAD_INTERRUPTED(false, 1504, "Thread 중단"),
    NGINX_UPDATE_FAIL(false, 1505, "Nginx 리버스 프록시 설정 실패"),
    GIT_CLONE_FAIL(false, 1506, "Git Clone 실패"),
    MYSQL_START_FAIL(false, 1507, "MySQL 실행 실패"),
    CONTAINER_START_FAIL(false, 1508, "Container 재실행 실패"),
    MYSQL_RESTART_FAIL(false, 1509, "MySQL 재실행 실패"),
    CONTAINER_STOP_FAIL(false, 1510, "Container 중지 실패"),
    CHANGE_DARK_MODE_FAIL(false, 1511, "DarkMode 변경 실패"),
    WEB_SOCKET_RUN_FAIL(false, 1512, "WebSocket 실행 실패"),
    NOT_EXISTS_CONTAINER(false, 1513, "Not Exists Container"),
    ;


    private final boolean isSuccess;
    private final int code;
    private final String message;

    StatusCode(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}

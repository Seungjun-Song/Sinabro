package com.HP50.be.global.common;
import lombok.Getter;

@Getter
public enum StatusCode {
    // Success
    SUCCESS(true, 100, "요청에 성공하였습니다."),
    

    // COMMON
    FORBIDDEN_REQUEST(false, 202, "접근 권한이 없습니다."),


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

    // Member ( 600 )
    NOT_EXIST_MEMBER(false,601,"해당하는 멤버가 없습니다."),
    // Calender ( 700 )
    FAIL_CREATE_CALENDER(false, 701, "일정 추가에 실패했습니다"),
    NOT_EXIST_CALENDER(false,702,"해당하는 일정이 없습니다"),
    // Port (800)
    NOT_EXIST_PORT(false,801,"지급할 수 있는 포트가 없습니다.")
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

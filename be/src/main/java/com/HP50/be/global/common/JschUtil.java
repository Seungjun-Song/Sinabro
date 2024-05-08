package com.HP50.be.global.common;

import com.HP50.be.global.exception.BaseException;
import com.jcraft.jsch.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class JschUtil {
    @Value("${host}")
    private String host;

    @Value("${user}")
    private String user;

    @Value("${privateKey}")
    private String privateKey;

    // SSH 세션 생성
    public Session createSession() {
        try {
            JSch jsch = new JSch();
            jsch.addIdentity(privateKey); // 개인 키를 JSch 세션에 추가
            Session session = jsch.getSession(user, host, 22); // SSH 세션 생성
            session.setConfig("StrictHostKeyChecking", "no"); // 호스트 키 검사를 하지 않도록 설정
            session.connect(); // 세션 연결
            return session;
        } catch (JSchException e) {
            throw new BaseException(StatusCode.SESSION_CONNECT_FAIL); // 세션 연결 실패 시 예외 처리
        }
    }

    public boolean isContainerReady(Session session, String command) {
        try {
            Channel channel = session.openChannel("exec");
            ((ChannelExec) channel).setCommand(command); // 실행할 명령 설정

            channel.connect(); // 채널 연결

            InputStream in = channel.getInputStream(); // 표준 출력 스트림
            StringBuilder status = getStringBuilder(in); // 표준 출력 내용
            System.out.println("status = " + status);

            channel.disconnect();

            Thread.sleep(1000); // 1초 간격으로 체크

            return "healthy".contentEquals(status); // 컨테이너 상태(starting: 실행 중, healthy: 켜짐, unhealthy: 꺼짐)
        } catch (JSchException e) {
            throw new BaseException(StatusCode.CHANNEL_CONNECT_FAIL); // 채널 연결 실패 시 예외 처리
        } catch (IOException e) {
            throw new BaseException(StatusCode.STREAM_HANDLING_FAIL); // 스트림 처리 실패 시 예외 처리
        } catch (InterruptedException e) {
            throw new BaseException(StatusCode.THREAD_INTERRUPTED); // 스레드 처리 실패 시 예외 처리
        }
    }

    // 주어진 SSH 세션을 통해 명령 실행
    public boolean executeCommand(Session session, String command) {
        try {
            Channel channel = session.openChannel("exec");
            ((ChannelExec) channel).setCommand(command); // 실행할 명령 설정

            channel.connect(); // 채널 연결

            InputStream in = channel.getInputStream(); // 표준 출력 스트림
            InputStream err = ((ChannelExec) channel).getErrStream(); // 표준 오류 스트림

            StringBuilder output = getStringBuilder(in); // 표준 출력 내용
            StringBuilder errorOutput = getStringBuilder(err); // 표준 오류 내용

            logCommandResults(command, output, errorOutput, channel.getExitStatus()); // 명령 결과 로깅
            
            channel.disconnect(); // 채널 연결 해제
            
            return channel.getExitStatus() == 0; // 명령 실행 성공 여부 반환(성공 시 true)
        } catch (JSchException e) {
            throw new BaseException(StatusCode.CHANNEL_CONNECT_FAIL); // 채널 연결 실패 시 예외 처리
        } catch (IOException e) {
            throw new BaseException(StatusCode.STREAM_HANDLING_FAIL); // 스트림 처리 실패 시 예외 처리
        }
    }

    // 명령 결과 로깅
    private void logCommandResults(String command, StringBuilder output, StringBuilder errorOutput, int exitStatus) {
        System.out.println("=================================================");
        System.out.println("Command: " + command);
        System.out.println("Output: " + output);
        System.out.println("Error: " + errorOutput);
        System.out.println(exitStatus == 0 ? "성공" : "실패");
        System.out.println("=================================================");
    }

    // 스트림으로부터 데이터를 읽어 StringBuilder 객체로 반환
    private StringBuilder getStringBuilder(InputStream stream) throws IOException {
        StringBuilder sb = new StringBuilder();
        byte[] buffer = new byte[1024];
        int n;

        while ((n = stream.read(buffer)) != -1) {
            sb.append(new String(buffer, 0, n).trim());
        }

        return sb;
    }
    /*
        소나큐브에서 결과 확인하기 위해서 필요 + 추가
     */
    public String executeCommandAndGetOutput(Session session, String command) {
        try {
            Channel channel = session.openChannel("exec");
            ((ChannelExec) channel).setCommand(command); // 실행할 명령 설정

            channel.connect(); // 채널 연결

            InputStream in = channel.getInputStream(); // 표준 출력 스트림
            InputStream err = ((ChannelExec) channel).getErrStream(); // 표준 오류 스트림

            StringBuilder output = getStringBuilder(in); // 표준 출력 내용
            channel.disconnect(); // 채널 연결 해제

            return output.toString();
        } catch (JSchException e) {
            throw new BaseException(StatusCode.CHANNEL_CONNECT_FAIL); // 채널 연결 실패 시 예외 처리
        } catch (IOException e) {
            throw new BaseException(StatusCode.STREAM_HANDLING_FAIL); // 스트림 처리 실패 시 예외 처리
        }
    }
}

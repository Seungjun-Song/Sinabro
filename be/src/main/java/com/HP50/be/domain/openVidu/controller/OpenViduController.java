package com.HP50.be.domain.openVidu.controller;

import com.HP50.be.domain.openVidu.dto.RoomExistRequestDto;
import com.HP50.be.domain.openVidu.dto.RoomRequestDto;
import com.HP50.be.domain.openVidu.dto.RoomResponseDto;
import com.HP50.be.domain.openVidu.entity.Room;
import com.HP50.be.domain.openVidu.service.OpenViduService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import io.openvidu.java.client.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@Slf4j
@RestController
@RequestMapping("/room")
public class OpenViduController {
    private final OpenViduService service;

    private OpenVidu openvidu;

    @Autowired
    public OpenViduController(OpenViduService service) {
        this.service = service;
        this.openvidu = service.getOpenvidu();
    }
    /**
        OpenVidu에 참여하기 위해서는 SessionConnection Token이 필요
     */


    /**
        세션 만들기
     */
    @PostMapping
    public ResponseEntity<Object> createRoom( @RequestBody RoomRequestDto dto) throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("make room {}", dto);
        log.info("make room master {}", dto);

        int memberId = 1;//JWT 설정 필요
        String nickname = "김윤민2"; // JWT 처리

        //UUID 생성후
        UUID uuid = UUID.randomUUID();
        String sessionId = uuid.toString();
        // openvidu session Create start
        // openVidu 세션을 만들기위한 속성 정의.  세션 ID만 지정해둔다.
        Map<String, Object> sessionParams = new HashMap<>();
        sessionParams.put("customSessionId", sessionId);

        // SessionProperties -> openvidu세션을 생성하기 위한 속성을 정의하는 클래스
        // 세션값은 내가 임의로 부여 (UUID)
        SessionProperties properties = SessionProperties.fromJson(sessionParams).build();
        Session session = openvidu.createSession(properties);
        log.info("room session info {}", session.getSessionId());
        // openvidu session Create end

        // openvidu connection Create start
        Map<String, Object> connectionParams = new HashMap<>();
        connectionParams.put("nickname", nickname);
        ConnectionProperties connectionProperties = ConnectionProperties.fromJson(connectionParams).build();

        //openvidu session에 연결생성
        Connection connection = session.createConnection(connectionProperties);
        // openvidu connection Create end

        // roomSessionId 중복 체크 필요
        if (service.isExist(sessionId)){  // 세션 아이디가 중복이라면
            return ResponseEntity.badRequest().body(StatusCode.ALREADY_EXIST_CHAT);
        }

        try {
            RoomResponseDto result = service.createRoom(dto.getProjectId(), sessionId); //ConnectionToken도 함께 반환
            log.info("make room {}", result);
            result.setConnectionToken(connection.getToken());
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(result));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(StatusCode.FAIL_CREATE_ROOM);
        }
    }

    /**
        세션 입장
     */
    @PostMapping("/enter")
    public ResponseEntity<Object> enterRoom(@RequestBody RoomRequestDto dto) throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("room enter info {} ", dto);

        String sessionId = service.findByProjectId(dto.getProjectId());
        String nickname = "김윤민"; //JWT 처리 필요

        //sessionId 사용하여 OpenVidu에서 해당 세션 get|
        log.info(sessionId);
        log.info(nickname);
        Session session = openvidu.getActiveSession(sessionId);

        log.info("room enter {} {}",sessionId,nickname);

        //세션이 만약 없다면 return
        if (session == null) {
            log.info("session check {}", session);
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(StatusCode.NOT_EXIST_SESSION));
        }

        Room room = service.findByRoomId(sessionId);
        if(room!=null) log.info(room.getRoomId());
        if (service.enterRoom(sessionId)) {
            //프론트에서 넘어온 json데이터를 사용하여 ConnectionProperties 객체생성, openvidu session에 연결할때 필요
            Map<String, Object> params = new HashMap<>();
            params.put("nickname", nickname);
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();

            //openvidu session에 연결생성
            Connection connection = session.createConnection(properties);
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(connection.getToken()));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse<>(StatusCode.FAIL_CONNECT_SESSION));
        }
    }

    /**
        세션 나가기
        ( 남은사람이 1명 : 나혼자면 방 폭파 )
     */
    @PostMapping("/exit")
    public ResponseEntity<Object> exitRoom(@RequestBody RoomExistRequestDto dto) throws OpenViduJavaClientException, OpenViduHttpException {

        String sessionId =dto.getRoomId();
        String connectionId = dto.getConnectionId();

        log.info("room exit {} {}", sessionId, connectionId);
        if(sessionId == null || connectionId == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(StatusCode.BAD_REQUEST);
        }
        // 서비스 exit
        service.exitRoom(sessionId);
        
        // 세션을 삭제하는것이 아니라 connectionId만 제외하기 위해(게임 끝나고 재화)서 세션에서 제외
        // 나가려는 사용자가 퇴장, 세션에서도 제외한다.(프론트에서 보이지 않아도 백엔드쪽에는 정보가 남아있다, connectionId 제거)
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(StatusCode.NOT_EXIST_SESSION);
        // 현재 세션에서 연결중인 connection 목록을 가져옴.
        List<Connection> connections = session.getConnections();

        // 연결 끊기
        for (Connection connection : connections) {
            //나가려는 connection과 같은거 찾음
            if (connection.getConnectionId().equals(connectionId)) { //같으면
                session.forceDisconnect(connection); // dicConnect
                break;
            }
        }
        //세션 상태 update ( 인원 - 1 )
        try {
            Room room = service.findByRoomId(sessionId);
        }catch (BaseException e){ //만약 db에 없는거면 현재 유저도 다 나갔다는 의미 => Session 삭제
            if(!deleteSession(sessionId)){
                throw new BaseException(StatusCode.FAIL_DELETE_SESSION);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(StatusCode.SUCCESS));
    }


    /**
        openVidu Session Close
     */
    public boolean deleteSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) return false;
        session.close();
        return true;
    }

    /**
        Status Check Code
        openvidu session List확인
     */
    @GetMapping("/session/room-list")
    public ResponseEntity<Object> findAllSession() {
        List<String> roomList = new ArrayList<>();

        List<Session> sessions = openvidu.getActiveSessions();
        for (Session session : sessions) {
            roomList.add(session.getSessionId());
        }
        log.info("sessionList {}",roomList);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(roomList));
    }

    /**
      Status Check Code
      openvidu session connection확인
     */
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<Object> getSessionUsers(@PathVariable("sessionId") String sessionId) {
        List<String> connectionUsers = new ArrayList<>();

        Session session = openvidu.getActiveSession(sessionId);
        //getActiveConnections -> 활성상태만, getConnections -> 비활성상태도 포함(미디어스트림 제공하지 않는 connection, 음소거 등)
        List<Connection> connections = session.getConnections();

        for (Connection connection : connections) {
            connectionUsers.add(connection.getConnectionId());
        }
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(connectionUsers));
    }

}

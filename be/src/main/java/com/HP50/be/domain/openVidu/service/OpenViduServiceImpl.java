package com.HP50.be.domain.openVidu.service;

import com.HP50.be.domain.openVidu.dto.RoomResponseDto;
import com.HP50.be.domain.openVidu.entity.Room;
import com.HP50.be.domain.openVidu.repository.RoomRepository;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import io.openvidu.java.client.OpenVidu;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class OpenViduServiceImpl implements OpenViduService{
    private final RoomRepository roomRepository;
    private final ProjectRepository projectRepository;
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;
    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public OpenVidu getOpenvidu() {
        return openvidu;
    }

    // 방 만들기
    public RoomResponseDto createRoom(int projectId,String sessionId) {
        // 프로젝트 채팅방이 이미 있으면 return
        boolean isExist = roomRepository.existsByProject_ProjectId(projectId);
        if(isExist){
            throw new BaseException(StatusCode.ALREADY_EXIST_CHAT);
        }
        //프로젝트 가져와서
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));

        //Room 저장
        Room room = Room.builder()
                .roomId(sessionId)
                .project(project)
                .roomCount(1)
                .build();


        roomRepository.save(room);
        RoomResponseDto result = RoomResponseDto.builder()
                .sessionId(sessionId)
                .roomCount(1)
                .build();
        return result;
    }

    // 방 정보 가져오기
    public Room findByRoomId(String roomId){
        return roomRepository.findById(roomId).orElseThrow(()->new BaseException(StatusCode.NOT_EXIST_CHAT));
    }
    /*
        프로젝트로 방 정보 가져오기
        return : SessionId
     */
    public String findByProjectId(Integer projectId){
        return roomRepository.findByProject_ProjectId(projectId).getRoomId();
    }


    // 방 입장 (현재 방 참가 인원 +1)
    public boolean enterRoom(String roomSessionId) {

        Room room = roomRepository.findById(roomSessionId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CHAT));
        log.info("service - enter room {}", room.toString());
        try{
            room.addMember(room);
            return true;
        }catch (Exception e){
            log.error("enter room error",e);
        }

        return false;
    }

    // 방 나가기
    public boolean exitRoom(String roomSessionId) {
        // id로 방 정보 가져오기
        Room room = roomRepository.findById(roomSessionId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CHAT));
        try {
            Integer roomCount = room.getRoomCount();
            if(roomCount-1==0){ //내가 나가서 유저가 없으면 방 삭제
                roomRepository.delete(room);
            }else{
                room.minusMember(); //있으면 -1
            }
            return true;
        } catch (Exception e) {
            log.error("exit room error",e);
        }
        return false;
    }

    // 방 삭제
    public void deleteRoom(String roomId) {
        roomRepository.deleteById(roomId);
    }

    // 방 중복체크
    public boolean isExist(String roomSessionId){
        return roomRepository.existsById(roomSessionId);
    }

}

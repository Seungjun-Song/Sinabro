package com.HP50.be.domain.openVidu.service;

import com.HP50.be.domain.openVidu.dto.RoomResponseDto;
import com.HP50.be.domain.openVidu.entity.Room;
import io.openvidu.java.client.OpenVidu;

public interface OpenViduService {
    RoomResponseDto createRoom(int projectId, String sessionId);
    Room findByRoomId(String roomId);
    boolean enterRoom(String roomSessionId);
    boolean exitRoom(String roomSessionId);
    void deleteRoom(String roomId);
    boolean isExist(String roomSessionId);
    OpenVidu getOpenvidu();
    String findByProjectId(Integer projectId);
}

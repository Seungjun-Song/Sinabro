package com.HP50.be.domain.openVidu.repository;

import com.HP50.be.domain.openVidu.entity.Room;
import org.springframework.data.repository.CrudRepository;

public interface RedisRoomRepository extends CrudRepository<Room,String> {
    boolean existsByProjectId(Integer projectId);
    Room findByProjectId(Integer projectId);
}

package com.HP50.be.domain.openVidu.repository;

import com.HP50.be.domain.openVidu.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room,String> {
    boolean existsByProject_ProjectId(Integer projectId);

    Room findByProject_ProjectId(Integer projectId);

}

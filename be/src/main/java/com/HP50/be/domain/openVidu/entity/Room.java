package com.HP50.be.domain.openVidu.entity;

import com.HP50.be.domain.openVidu.dto.RoomResponseDto;
import com.HP50.be.domain.project.entity.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    private String roomId; //roomId가 곧 sessionId
    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
    private Integer roomCount;

    public void addMember(Room room){
        room.roomCount+=1;
    }
    public void minusMember(){
        this.roomCount-=1;
    }

}

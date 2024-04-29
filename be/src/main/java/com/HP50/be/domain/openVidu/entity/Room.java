package com.HP50.be.domain.openVidu.entity;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash("Room")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    private String roomId; //== sessionId

    @Indexed
    private Integer projectId;
    private Integer roomCount;

    public void addMember(Room room){
        room.roomCount+=1;
    }
    public void minusMember(){
        this.roomCount-=1;
    }

}

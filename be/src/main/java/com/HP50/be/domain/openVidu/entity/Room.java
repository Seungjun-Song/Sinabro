package com.HP50.be.domain.openVidu.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash("Room")
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    private String roomId; //== sessionId

    @Indexed
    private Integer projectId;
    private Integer roomCount;

    public Room addMember(Room room){
        room.roomCount+=1;
        return room;
    }
    public void minusMember(){
        this.roomCount-=1;
    }

}

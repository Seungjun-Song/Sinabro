package com.HP50.be.domain.openVidu.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomExistRequestDto {
    String roomId;
    String connectionId;

}

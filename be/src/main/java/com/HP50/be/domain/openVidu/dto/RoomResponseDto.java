package com.HP50.be.domain.openVidu.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponseDto {
    String sessionId;
    Integer roomCount;
    String connectionToken;
}

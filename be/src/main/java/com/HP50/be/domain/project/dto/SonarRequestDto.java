package com.HP50.be.domain.project.dto;

import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SonarRequestDto {
    Integer projectId;
}

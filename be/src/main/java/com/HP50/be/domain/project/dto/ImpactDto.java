package com.HP50.be.domain.project.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImpactDto {
    String softwareQuality;
    String severity;
}

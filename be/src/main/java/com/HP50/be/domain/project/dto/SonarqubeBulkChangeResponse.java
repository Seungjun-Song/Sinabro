package com.HP50.be.domain.project.dto;

import lombok.*;
import org.hibernate.annotations.SecondaryRow;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SonarqubeBulkChangeResponse {
    Integer total;
    Integer success;
    Integer ignored;
    Integer failures;
}

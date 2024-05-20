package com.HP50.be.global.oauth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GithubEmailDto {
    private String email;
    private boolean primary;
    private boolean verified;
    private String visibility;
}

package com.HP50.be.global.oauth;

import com.HP50.be.global.jwt.dto.JwtPayloadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2MemberDto implements OAuth2User {
    private final JwtPayloadDto jwtPayloadDto;

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return jwtPayloadDto.getMemberName();
    }

    public String getMemberEmail(){
        return jwtPayloadDto.getMemberEmail();
    }

    public Integer getMemberId(){
        return jwtPayloadDto.getMemberId();
    }

    public String getMemberGit(){
        return jwtPayloadDto.getMemberGit();
    }

    public String getMemberImg(){
        return jwtPayloadDto.getMemberImg();
    }
}

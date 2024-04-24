package com.HP50.be.domain.member.dto;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2MemberDto implements OAuth2User {

    private final MemberDto memberDto;
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    // role 값 리턴
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return memberDto.getMemberName();
    }

    public String getMemberEmail(){
        return memberDto.getMemberEmail();
    }

    public Integer getMemberId(){
        return memberDto.getMemberId();
    }
}

package com.HP50.be.domain.member.service;

import com.HP50.be.domain.member.dto.TechStackDto;
import com.HP50.be.domain.member.entity.TechStack;
import com.HP50.be.global.common.BaseResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TechStackService {
    ResponseEntity<?> save(String token, List<TechStackDto> TechStackDtos);
    ResponseEntity<?> delete(List<TechStackDto> TechStackDtos);

}

package com.HP50.be.domain.member.service;

import com.HP50.be.domain.member.dto.TechStackDeleteRequestDto;
import com.HP50.be.domain.member.dto.TechStackSaveRequestDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TechStackService {
    void save(String token, List<TechStackSaveRequestDto> TechStackDtos);
    void delete(List<TechStackDeleteRequestDto> techStackIds);

}

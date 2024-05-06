package com.HP50.be.domain.member.service;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.service.SubCategoryService;
import com.HP50.be.domain.member.dto.TechStackDeleteRequestDto;
import com.HP50.be.domain.member.dto.TechStackSaveRequestDto;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.entity.TechStack;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.member.repository.TechStackRepository;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TechStackServiceImpl implements TechStackService{
    private final TechStackRepository techStackRepository;
    private final MemberRepository memberRepository;
    private final SubCategoryService subCategoryService;
    private final JwtUtil jwtUtil;
    @Override
    public ResponseEntity<?> save(String token, List<TechStackSaveRequestDto> techStackRequestDtos) {
        Integer memberId = jwtUtil.getMemberId(token);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        for(TechStackSaveRequestDto techStackRequestDto: techStackRequestDtos){
            SubCategory subCategory = subCategoryService.findById(techStackRequestDto.getSubCategoryId());

            TechStack techStack = TechStack.builder()
                    .member(member)
                    .subCategory(subCategory)
                    .subCategoryName(subCategory.getSubCategoryName())
                    .build();
            techStackRepository.save(techStack);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Override
    public ResponseEntity<?> delete(List<TechStackDeleteRequestDto> techStackIds) {
        for(TechStackDeleteRequestDto dto: techStackIds) techStackRepository.deleteById(dto.getTechStackId());

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(StatusCode.SUCCESS));
    }
}

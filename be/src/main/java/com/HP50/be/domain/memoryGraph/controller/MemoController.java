package com.HP50.be.domain.memoryGraph.controller;

import com.HP50.be.domain.memoryGraph.dto.MemoDto;
import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.repository.MemoCustomRepository;
import com.HP50.be.domain.memoryGraph.service.MemoService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.oauth.CustomOAuth2MemberDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.neo4j.driver.summary.ResultSummary;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@Tag(name = "Memo", description = "Neo4j의 Node 관련 API입니다.")
@RestController
@RequestMapping("/memo")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @Operation(summary = "유저의 메모 모두 보기", description = "테스트 용")
    @GetMapping
    public ResponseEntity<BaseResponse<List<MemoDto>>> findAll(@CookieValue(JwtConstants.JWT_HEADER) String token){
        return ResponseEntity.ok().body(new BaseResponse<>(memoService.findMemoByMemberId(token)));
    }

    @Operation(summary = "메모 저장하기", description = "최초 저장시 반드시 관계부여함")
    @PostMapping
    public ResponseEntity<BaseResponse<StatusCode>> saveMemo(@RequestBody MemoDto memoDto,
                                                             @CookieValue(JwtConstants.JWT_HEADER) String token){
        memoService.saveMemo(token, memoDto);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    // memoId1 -> memoId2
    // memoId2 는 member 와의 관계를 끊고 memo에 의존됌
    @Operation(summary = "메모와 메모간의 관계 부여", description = "관계 명은 out_going")
    @PutMapping
    public ResponseEntity<BaseResponse<StatusCode>> setMemoToMemo(@CookieValue(JwtConstants.JWT_HEADER) String token,
                                                                  @RequestParam("memoId1") String memoId1,
                                                                  @RequestParam("memoId2") String memoId2){
        memoService.setMemoToMemo(token, memoId1, memoId2);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @Operation(summary = "메모 삭제", description = "관계 또한 같이 삭제 됌")
    @DeleteMapping
    public ResponseEntity<BaseResponse<StatusCode>> deleteMemo(@RequestParam("memoId") String memoId){
        memoService.deleteMemo(memoId);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

    @PutMapping("/update")
    public ResponseEntity<BaseResponse<StatusCode>> updateMemo(@RequestBody MemoDto memoDto){
        memoService.updateMemo(memoDto);
        return ResponseEntity.ok().body(new BaseResponse<>(StatusCode.SUCCESS));
    }

}

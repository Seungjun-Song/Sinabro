package com.HP50.be.domain.project.controller;

import com.HP50.be.domain.payment.repository.PaymentRepository;
import com.HP50.be.domain.project.dto.SonarQubeRequestDto;
import com.HP50.be.domain.project.dto.SonarQubeResultDto;
import com.HP50.be.domain.project.dto.SonarRequestDto;
import com.HP50.be.domain.project.service.SonarQubeService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SonarQubeController {
    private final SonarQubeService sonarQubeService;
    private final PaymentRepository paymentRepository;
    /**
        정적 분석
     */
    @PostMapping("/scan")
    public ResponseEntity<Object> triggerSonarScan(
            @RequestBody SonarRequestDto dto) {
        sonarQubeService.executeSonarScanner(dto.getProjectId(),dto.getFolderName());
        return ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }
    /**
     * 소나큐브 결과 상태 확인.
     * ok가 결과로 나온다면 소나큐브 작동 완료
     */
    @GetMapping("/scan/status/{projectId}") 
    public ResponseEntity<Object> getStatus(@PathVariable Integer projectId){
        //결제 헀는지 확인
        boolean isExist = paymentRepository.existsByProject_ProjectId(projectId);
        if(!isExist){ //결제 안했으면 return
            throw new BaseException(StatusCode.REQUIRE_PAYMENT);
        }

        JsonObject jsonObject = getJsonObject(projectId,1,true);

        int total = jsonObject.get("total").getAsInt();
        if(total==0){ //아직 소나큐브가 돌아가는 중
            throw new BaseException(StatusCode.RUNNING_SONARQUBE);
        }else{ // 되면 ok response
            return ResponseEntity.ok(new BaseResponse<>(total));
        }
    }

    /**
     * 소나큐브 결과 반환
     *
     */
    @PostMapping("/scan-result")
    public ResponseEntity<Object> getSonarQube(@RequestBody SonarQubeRequestDto dto){
        //결제 헀는지 확인
        boolean isExist = paymentRepository.existsByProject_ProjectId(dto.getProjectId());
        if(!isExist){ //결제 안했으면 return
            throw new BaseException(StatusCode.REQUIRE_PAYMENT);
        }
        //결제 했다면 api 결과 받아옴.
        JsonObject jsonObject = getJsonObject(dto.getProjectId(), dto.getPageNumber(),false);


        SonarQubeResultDto result = sonarQubeService.getResult(dto.getProjectId(), dto.getPageNumber(), jsonObject);

        return ResponseEntity.ok(new BaseResponse<>(result));
    }

    /**
     * 소나큐브 결과 JsonObject
     */
    private static JsonObject getJsonObject(Integer projectId,Integer pageNumber,boolean totalTest) {
        //엔드포인트 설정
        StringBuilder sb = new StringBuilder();
        String componentsKey = "sonarQube_"+ projectId;
        sb.append("http://k10e103.p.ssafy.io:9000/api/issues/search?componentKeys=").append(componentsKey).append("&p=").append(pageNumber);
        if(totalTest) sb.append("&ps=1");
        //헤더 설정
        HttpHeaders headers =new HttpHeaders();
        headers.set("Content-Type", "application/json");
        //토큰 입력 start
        String token = "squ_4e19fc10ed04b1e8815b83bd0fa853418790e59f:"; //:를 붙이고 인코딩하는게 일반적
        //SonarQube에서는 Base64 인코딩 문자열 사용.
        String encodedToken = Base64.getEncoder().encodeToString(token.getBytes());
        headers.set("Authorization", "Basic " + encodedToken);
        //토큰 입력 end
        // RestTemplate 생성
        RestTemplate restTemplate = new RestTemplate();

        // RequestEntity를 생성하여 헤더를 설정
        RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, URI.create(sb.toString()));

        // ResponseEntity를 사용하여 응답 저장
        String responseBody = restTemplate.exchange(requestEntity, String.class).getBody();
        if(responseBody==null) throw new BaseException(StatusCode.FAIL_API_REQUEST);
        //parser를 사용해서 결과 분석
        JsonParser parser = new JsonParser();
        return parser.parse(responseBody).getAsJsonObject();
    }

}

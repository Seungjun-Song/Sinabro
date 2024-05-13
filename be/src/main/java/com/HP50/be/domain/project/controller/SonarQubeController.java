package com.HP50.be.domain.project.controller;

import com.HP50.be.domain.payment.repository.PaymentRepository;
import com.HP50.be.domain.project.dto.*;
import com.HP50.be.domain.project.service.SonarQubeService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import retrofit2.http.Path;

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
     * 폴더 구조 가져오기
     */
    @GetMapping("/scan-folder/{projectId}")
    public ResponseEntity<Object> getFolders(@PathVariable Integer projectId){
        List<String> result = sonarQubeService.getFolders(projectId);
        return ResponseEntity.ok(new BaseResponse<>(result));
    }
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

        JsonObject jsonObject = getJsonObject(projectId,1,0);
        JsonObject jsonObject1 = getJsonObject(projectId, 1, 3);
        int total = jsonObject.get("total").getAsInt();
        int openTotal = jsonObject1.get("total").getAsInt();
        SonarQubeTotalResponseDto result = SonarQubeTotalResponseDto.builder()
                .total(total)
                .openTotal(openTotal)
                .build();
        if(total==0){ //아직 소나큐브가 돌아가는 중
            throw new BaseException(StatusCode.RUNNING_SONARQUBE);
        }else{ // 되면 ok response
            return ResponseEntity.ok(new BaseResponse<>(result));
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
        JsonObject jsonObject = getJsonObject(dto.getProjectId(), dto.getPageNumber(),1);
        JsonObject jsonObject2 = getJsonObject(dto.getProjectId(), 1, 2);//여기서 얻은 issueList는 어짜피 사용 안함.
        Integer effortTotal = jsonObject2.get("effortTotal").getAsInt();
        Integer openTotal = jsonObject2.get("total").getAsInt();

        SonarQubeResultDto result = sonarQubeService.getResult(dto.getProjectId(), dto.getPageNumber(), jsonObject,effortTotal,openTotal);

        return ResponseEntity.ok(new BaseResponse<>(result));
    }
    /**
     * 소나큐브 issueStatus 수정
     * bulk change를 이용한 일괄 수정
     */
    @PostMapping("/scan/status")
    public ResponseEntity<Object> changeIssueStatus(@RequestBody IssueStatusDto dto){
        // --- 파라미터 준비 start ------
        // 키로 parameter 생성 start ( ,로 구분 )
        List<String> keyList = dto.getKeyList();
        StringBuilder sb=  new StringBuilder();
        int size = keyList.size();
        for(int i=0;i<size;i++){
            String key = keyList.get(i);
            sb.append(key);
            if(i!=size-1) sb.append(",");
        }
        String issues=sb.toString();
        // 키로 parameter 생성 end
        String doTransition = dto.getIssueStatus();
        //--- 파라미터 준비 end ------

        // URL 준비 start
        StringBuilder request = new StringBuilder();
        request.append("http://k10e103.p.ssafy.io:9000/api/issues/bulk_change?")
                .append("issues=").append(issues).append("&")
                .append("do_transition=").append(doTransition);
        // URL 준비 end
        
        // 요청 보냄
        String responseBody = getResponseBody(request, HttpMethod.POST, "");
        // Json 파싱 start
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(responseBody).getAsJsonObject();
        int total = jsonObject.get("total").getAsInt();
        int success = jsonObject.get("success").getAsInt();
        int ignored = jsonObject.get("ignored").getAsInt();
        int failures = jsonObject.get("failures").getAsInt();
        // Json 파싱 end

        // 반환 DTO 작성
        SonarqubeBulkChangeResponse result = SonarqubeBulkChangeResponse.builder()
                .total(total)
                .success(success)
                .ignored(ignored)
                .failures(failures)
                .build();

        return ResponseEntity.ok(new BaseResponse<>(result));
    }


    /**
     * 소나큐브 결과 JsonObject
     */
    private static JsonObject getJsonObject(Integer projectId,Integer pageNumber,Integer getCase) {
        //엔드포인트 설정
        StringBuilder sb = new StringBuilder();
        String componentsKey = "sonarQube_"+ projectId;
        sb.append("http://k10e103.p.ssafy.io:9000/api/issues/search?componentKeys=").append(componentsKey).append("&p=").append(pageNumber);
        if(getCase==0) sb.append("&ps=1"); //결과 테스트
                else if(getCase==1)sb.append("&ps=20");//기존 반환
                else if(getCase==2) sb.append("&issueStatuses=OPEN,CONFIRMED"); //현재 상태만.
        else if(getCase==3) sb.append("&ps=1").append("&issueStatuses=OPEN,CONFIRMED");
        sb.append("&s=STATUS");
        String responseBody = getResponseBody(sb,HttpMethod.GET,"");
        //parser를 사용해서 결과 분석
        JsonParser parser = new JsonParser();
        return parser.parse(responseBody).getAsJsonObject();
    }
    /*
        응답 처리
     */
    @NotNull
    private static String getResponseBody(StringBuilder sb,HttpMethod httpMethod,String jsonBody) {
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
        RequestEntity<String> requestEntity = null;
        // RequestEntity를 생성하여 헤더를 설정
        if (httpMethod==HttpMethod.GET){
            requestEntity = new RequestEntity<>(headers, httpMethod, URI.create(sb.toString()));
        }else if(httpMethod==HttpMethod.POST){
            requestEntity = new RequestEntity<>(jsonBody, headers, httpMethod, URI.create(sb.toString()));
        }
        // ResponseEntity를 사용하여 응답 저장
        String responseBody = restTemplate.exchange(requestEntity, String.class).getBody();
        if(responseBody==null) throw new BaseException(StatusCode.FAIL_API_REQUEST);
        return responseBody;
    }

}

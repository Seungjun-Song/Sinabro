package com.HP50.be.domain.payment.controller;

import com.HP50.be.domain.payment.dto.PaymentRequestDto;
import com.HP50.be.domain.payment.dto.PaymentResponseDto;
import com.HP50.be.domain.payment.dto.PaymentValidateDto;
import com.HP50.be.domain.payment.entity.Payment;
import com.HP50.be.domain.payment.repository.PaymentCustomRepository;
import com.HP50.be.domain.payment.service.PaymentService;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtConstants;
import com.HP50.be.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentCustomRepository paymentCustomRepository;
    private final JwtUtil jwtUtil;
    /*
        DB에 결제할 정보 저장.
        이후 누가 결제를 진행할건지 멤버에 대한 정보를 return 해준다.
     */
    @PostMapping
    public ResponseEntity<Object> requestPayment(@CookieValue (JwtConstants.JWT_HEADER)String token
            ,@RequestBody PaymentRequestDto requestDto){
        //팀원만 신청 가능
        Integer memberId = jwtUtil.getMemberId(token);
        PaymentResponseDto paymentResponseDto = paymentService.requestPayment(memberId, requestDto.getProjectId(), requestDto.getPaymentAmount());
        return ResponseEntity.ok(new BaseResponse<>(paymentResponseDto));
    }
    /*
        결제 후 검증
     */
    @PostMapping("/validate")
    public ResponseEntity<Object> validatePayment(@CookieValue (JwtConstants.JWT_HEADER) String token,
                                                  @RequestBody PaymentValidateDto requestDto){
        Integer memberId = jwtUtil.getMemberId(token);
        Boolean result = paymentService.validatePayment(memberId, requestDto);
        if(!result) return ResponseEntity.status(500).body(new BaseResponse<>(StatusCode.FAIL_VALIDATE_PAYMENT));
        return  ResponseEntity.ok(new BaseResponse<>(StatusCode.SUCCESS));
    }

    /*
        해당 프로젝트가 결제 했는지 확인
        있으면 해당 데이터 넘겨주고, 없으면 NOT_EXIST_PAYMENT 코드 내보냄
     */
    @GetMapping("/{projectId}")
    public ResponseEntity<Object> paidSonar(@PathVariable Integer projectId){
        Payment checkPaid = paymentCustomRepository.getCheckPaid(projectId);
        //결제했으면 해당 데이터 return
        if(checkPaid!=null)return  ResponseEntity.ok(new BaseResponse<>(checkPaid));
        //안했으면 결제 안했다 함
        else return ResponseEntity.ok(new BaseResponse<>(StatusCode.NOT_EXIST_PAYMENT));
    }
}

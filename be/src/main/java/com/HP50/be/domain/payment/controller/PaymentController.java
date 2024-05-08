package com.HP50.be.domain.payment.controller;

import com.HP50.be.domain.payment.dto.PaymentRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    @PostMapping
    public ResponseEntity<Object> requestPayment(@RequestBody PaymentRequestDto requestDto){
        
        return null;
    }

}

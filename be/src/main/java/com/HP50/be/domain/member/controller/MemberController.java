package com.HP50.be.domain.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
public class MemberController {

    @GetMapping("/hi")
    public ResponseEntity<String> hi(){
        return ResponseEntity.ok("Hi");
    }
}

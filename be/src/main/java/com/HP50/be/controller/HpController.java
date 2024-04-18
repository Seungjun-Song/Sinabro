package com.HP50.be.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HpController {

    @GetMapping("/hello")
    public ResponseEntity<String> hello(){

        return ResponseEntity.ok("client");
    }

}

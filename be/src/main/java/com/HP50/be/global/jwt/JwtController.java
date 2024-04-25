package com.HP50.be.global.jwt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jwt")
public class JwtController {

    @GetMapping
    public String s(@RequestHeader("Access_token") String authorizationHeader){
        return "Authorization header value: " + authorizationHeader;
    }

}

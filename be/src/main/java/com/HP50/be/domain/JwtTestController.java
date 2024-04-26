package com.HP50.be.domain;

import com.HP50.be.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jwt")
@RequiredArgsConstructor
public class JwtTestController {
    private final JwtUtil jwtUtil;
    @GetMapping
    public String redirectResponse(@RequestParam("accessToken") String accessToken,
                                   @RequestParam("refreshToken") String refreshToken){
        return "<h1> 정상적으로 작동 되었습니다.</h1>" +
                " " + accessToken +
                " " + refreshToken;
    }
    
    @GetMapping("/test")
    public String redirectResponse1(String token){
        Integer memberId = jwtUtil.getMemberId(token);
        return "<h1> test로 무사히 이동완료.<h1>";
    }
}

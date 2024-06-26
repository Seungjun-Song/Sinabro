package com.HP50.be.global.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        // UTF8로 인코딩 하고 암호화는 HS256 방식으로 진행된다.
        // secret을 문자열로 받았기 때문에 SecretKeySpec 로 변환하는 과정이 필요
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public Integer getMemberId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().
                parseSignedClaims(token).
                getPayload()
                .get("memberId", Integer.class);
    }

    public String getEmail(String token) {
        return Jwts.parser().verifyWith(secretKey).build().
                parseSignedClaims(token).
                getPayload()
                .get("email", String.class);
    }

    public String getMemberName(String token) {

        return Jwts.parser().verifyWith(secretKey).build().
                parseSignedClaims(token).
                getPayload()
                .get("memberName", String.class);
    }

    public String getMemberGit(String token) {

        return Jwts.parser().verifyWith(secretKey).build().
                parseSignedClaims(token).
                getPayload()
                .get("memberGit", String.class);
    }

    public String getMemberImg(String token) {

        return Jwts.parser().verifyWith(secretKey).build().
                parseSignedClaims(token).
                getPayload()
                .get("memberImg", String.class);
    }

    public Boolean isExpired(String token) {
        try {
            // 토큰 파싱 및 유효성 검사
            Claims payload = Jwts.parser().verifyWith(secretKey).build()
                    .parseSignedClaims(token)
                    .getPayload();
            Date expiration = payload.getExpiration();
            // 토큰이 만료되지 않았으면 true 반환
            return expiration.before(new Date());
        } catch (ExpiredJwtException ex) {
            // 토큰이 만료되었을 때는 false 반환
            return true;
        }
    }

   public String tokenFromRequest(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie: cookies){
            if(cookie.getName().equals(JwtConstants.JWT_HEADER))
                return cookie.getValue();
        }
        return null;
   }

    public Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge((int) JwtConstants.REFRESH_EXP_TIME);
        cookie.setHttpOnly(true); // JavaScript에서 접근을 제한합니다.
        cookie.setSecure(true); // HTTPS 연결에서만 전송합니다.
        cookie.setPath("/");

        return cookie;
    }


//   public boolean isExistsRefreshTokenInRedis(){
//
//   }

    public String createToken(Integer memberId, String email,
                                  String memberName, String memberGit,
                                  String memberImg, long expiredTime){
        return Jwts.builder()

                // header를 따로 지정해주지 않는다면 type 이 지정되지 않음
                // jwt 를 많이 사용하니까 따로 명시해주지 않는다면 jwt 로 판단함

//                .header()
////                    .add("typ", "jwt")
////                    .and()
                // claim는 jwt 내부에 들어갈 payload
                .claim("company", JwtConstants.COMPANY)
                .claim("memberId", memberId)
                .claim("email", email)
                .claim("memberName", memberName)
                .claim("memberGit", memberGit)
                .claim("memberImg", memberImg)

                .issuedAt(new Date(System.currentTimeMillis())) // jwt 발급한 시간
                .expiration(new Date(System.currentTimeMillis() + expiredTime)) // jwt 만기 시간
                .signWith(secretKey) // 해당 키로 암호화를 하겠다.
                .compact(); // jwt 생성
    }

    public String reissueAccessToken(String accessToken) {
        Integer memberId = this.getMemberId(accessToken);
        String memberEmail = this.getEmail(accessToken);
        String memberName = this.getMemberName(accessToken);
        String memberGit = this.getMemberGit(accessToken);
        String memberImg = this.getMemberImg(accessToken);

        // this.getMemberId(accessToken)가 레디스에 있다면
        return null;
    }
}

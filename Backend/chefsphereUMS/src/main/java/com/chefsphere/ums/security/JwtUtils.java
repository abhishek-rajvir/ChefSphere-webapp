package com.chefsphere.ums.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Component // to declare a spring bean
@Slf4j
public class JwtUtils {

	// value will be injected for app properties
	@Value("${jwt.expiration.time}")
	private long jwtExpirationTime;
	@Value("${jwt.secret}")
	private String jwtSecret;

	// represents symmetric secret key used for signing as well as verifying the JWT
	private SecretKey secretKey;

	// will be called after setting of DI
	@PostConstruct
	public void myInit() {
		// creating symmetric secret key exactly once at startup
		log.info("****** creating symmetric secret key {} {} ", jwtSecret, jwtExpirationTime);
		secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	// create JWT - header , payload, signature (method will be user controller)
	public String generateToken(UserPrincipal principal) {

		/**
		 * Decoded Header JSON Claims Table Copy
		 * 
		 * { "alg": "HS256", "typ": "JWT" } Decoded Payload JSON Claims Table Copy
		 * 
		 * { "sub": "1234567890", "name": "John Doe", "admin": true, "iat": 1516239022 }
		 **/

		// iat
		Date now = new Date();
		// exp calc exp date
		Date expiresAt = new Date(now.getTime() + jwtExpirationTime);
		return Jwts.builder() // creates a builder fro JWT creation
				// setting subject who has generated i
				.subject(principal.getEmail())
				// when was it issued
				.issuedAt(now) // iat
				.expiration(expiresAt) // exp
				// custom claims - user id & user role
				.claims(Map.of("user_id", String.valueOf(principal.getUserId()), "user_role", principal.getUserRole()))
				.signWith(secretKey)// sign the JWT
				.compact();

	}

	// will be invoked by Custom JWT filter
	public Claims validateToken(String jwt) {
		return Jwts.parser() // attach a parser
				.verifyWith(secretKey).build() // builds JwtsParser
				// if tampered or invalid pSC will throw exception
				.parseSignedClaims(jwt)
				// valid jwt
				.getPayload(); // extracting claims from validated jwt

	}

	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	}

	public String extractToken(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			return header.substring(7);
		}
		throw new RuntimeException("Missing or invalid Authorization header");
	}

	public String extractUsername(String token) {
		return extractAllClaims(token).getSubject();
	}

	public Long extractUserId(String token) {
		return Long.valueOf(extractAllClaims(token).get("user_id", String.class));
	}

	public String extractRole(String token) {
		return extractAllClaims(token).get("user_role", String.class);
	}

	public boolean isTokenValid(String token) {
		try {
			return !extractAllClaims(token).getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}

	public Claims extractAllClaims(String token) {
		return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
	}
	
	/*
	 * Helper methods
	 */
	public Long extractUidFromReq(HttpServletRequest req) {
		// get token
		String token = extractToken(req);

		// get user id
		return extractUserId(token);
	}
}

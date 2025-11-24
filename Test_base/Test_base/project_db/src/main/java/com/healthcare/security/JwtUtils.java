package com.healthcare.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.healthcare.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtils {

	/*
	 * Injecting the value of the porperty in to a field Equivalent to name & value
	 * pair in xml tags ${jwt.secret.key} - SpEL (Spring expression Language)
	 */
	@Value("${jwt.secret.key}")
	private String secretKey;
	@Value("${jwt.expiration.time}")
	private long expTime;
	private SecretKey key;// symmetric

	@PostConstruct
	public void myInit() {
		key = Keys.hmacShaKeyFor(secretKey.getBytes());
		System.out.println("secret key created ...");
	}

	// add a method to generate signed JWT (JWTS)
	public String genrateToken(User u) {

		Date now = new Date();// iat
		Date expDate = new Date(now.getTime() + expTime);// exp date n time

		return Jwts.builder() // creates JWT builder
				.subject(u.getEmail()).issuedAt(now).expiration(expDate)
				.claims(Map.of("userId", u.getId(), "role", u.getType().name())).signWith(key).compact();
	}

	// verify token
	public Claims validateToken(String jwt) {
		return Jwts.parser().verifyWith(key).build() // builds the parse with the same symmetric key
				.parseSignedClaims(jwt) // in case of no exc - JWT valid
				.getPayload();
	}

}

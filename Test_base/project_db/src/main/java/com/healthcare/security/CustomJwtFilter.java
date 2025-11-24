package com.healthcare.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.healthcare.dto.JwtDTO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class CustomJwtFilter extends OncePerRequestFilter {
	//depcy
	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, 
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// 1. check for auth header
		String authHeaderValue=request.getHeader("Authorization");
		if(authHeaderValue != null && authHeaderValue.startsWith("Bearer "))
		{
			log.info("JWT found! ");
			String jwt=authHeaderValue.substring(7);
			//validate JWT
			Claims claims = jwtUtils.validateToken(jwt);
			//get user id , email , role - DTO
			Long userId=claims.get("userId", Long.class);
			String role=claims.get("role",String.class);
			String email=claims.getSubject();
			JwtDTO dto=new JwtDTO(userId, email, role);
			//create Authentication object
			UsernamePasswordAuthenticationToken token=
					new UsernamePasswordAuthenticationToken(dto, 
							null, List.of(new SimpleGrantedAuthority(role)));
			//save auth object under sec ctx holder
			SecurityContextHolder.getContext().setAuthentication(token);
			log.info("auth info stored in sec ctx.....");
		}
		//delegate to next filter in the chain
		filterChain.doFilter(request, response);

	}

}

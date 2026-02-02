package com.chefsphere.ums.security;

import com.chefsphere.ums.dto.ApiResponseDTO;
import com.chefsphere.ums.exception_handler.InvalidJWTException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component // spring bean
@RequiredArgsConstructor
public class CustomJwtVerificationFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;
	private final ObjectMapper objectMapper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			// 1. Check for Authorization header in the incoming request -> get its value
			String authHeader = request.getHeader("Authorization");
			if (authHeader != null && authHeader.startsWith("Bearer ")) {
				log.info("**** Bearer Token found ");
				// extracting JWT from auth token
				String jwt = authHeader.substring(7);
				// 2. validate token
				Claims claims = jwtUtils.validateToken(jwt);
				// 3. Create authentication object - user id & user role -
				// extract the claims
				String userId = claims.get("user_id", String.class);
				String userName = claims.get("user_name", String.class);
				String role = claims.get("user_role", String.class);
				List<SimpleGrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority(role));
				// 4. add these details UserPrincipal
				UserPrincipal principal = new UserPrincipal(userId, claims.getSubject(),userName,null, null, role);
				Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null,
						grantedAuthorities);
				log.info("*******auth {}",authentication);
				// 5. store Authentication object under spring security context
				SecurityContextHolder.getContext().setAuthentication(authentication);
				log.info("**** store auth under sec ctx");
			}
			// delegate request handling to the next filter in the chain
			filterChain.doFilter(request, response);
		}
		catch(ExpiredJwtException e) {
			log.error("JWT expired");
			throw new InvalidJWTException(
	              "error: TOKEN_EXPIRED"+
	              "message: JWT has expired. Please login again."
	            );
		} catch (Exception e) {
			log.error("Invalid JWT {} ",e);
			e.printStackTrace();
			SecurityContextHolder.clearContext();// important
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType("application/json");
			ApiResponseDTO<String> resp=new ApiResponseDTO<String>(e.getMessage(),false,"Failed");
			//printwriter
			response.getWriter().write(objectMapper.writeValueAsString(resp));
			return;
		}

	}

}

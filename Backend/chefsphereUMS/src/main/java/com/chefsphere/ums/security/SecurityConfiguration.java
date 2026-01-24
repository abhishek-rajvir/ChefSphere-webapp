package com.chefsphere.ums.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration // To declare a java configuration class (equivalent to bean config xml file)
@EnableWebSecurity // to enable spring security (in non reactive - servlet filter based)
@EnableMethodSecurity // to add method level authorization rules
@RequiredArgsConstructor
@Slf4j
public class SecurityConfiguration {
	// ctor based D.I
	private final CustomJwtVerificationFilter jwtFilter;

	/*
	 * Configure Spring sec filter chain as a spring bean (@Bean) to override the
	 * spring sec defaults Disable CSRF protection Disable HttpSession Disable login
	 * / logout page generation (i.e disable form login) Disable Basic
	 * Authentication scheme. Add authorization rules - swagger , sign in , sign up
	 * , listing doctors - public end points - role based authorization - any other
	 * request - only authentication required Add HttpSecurity as the dependency -
	 * to build sec filter chain - HttpSecurity is a builder for building Spring
	 * security filter chain.
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		log.info("********configuring spring sec filter chain*******");
		// disable CSRF protection not needed in case of stateless REST api
		http.cors(Customizer.withDefaults()).csrf(csrf -> csrf.disable());
				
		// disable HttpSession creation no jesession id
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// add url based authentication n authorization rules
		http.authorizeHttpRequests(request ->
//configure public end points [ unprotected public api no auth]
		request.requestMatchers("/v3/api-docs/**", "/swagger-ui/**","/users/**",
				"/users/pwd-encryption").permitAll()
				// in flight request from React front end extra request sent by react
				.requestMatchers(HttpMethod.OPTIONS).permitAll()

				.requestMatchers(HttpMethod.GET,"/users/signIn").permitAll()
				.requestMatchers(HttpMethod.GET, "/users/{username}").permitAll()
				.requestMatchers(HttpMethod.GET, "/users/imgkToken").permitAll()
				.requestMatchers(HttpMethod.GET,"/foodies/listAll").permitAll()
				.requestMatchers(HttpMethod.POST,"/foodies/signUp").permitAll()
				.requestMatchers(HttpMethod.GET,"/foodies/doesFollow/{creator_id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/foodies/allFollowing").permitAll()
				.requestMatchers(HttpMethod.GET,"/foodies/allFollowers").permitAll()
				.requestMatchers(HttpMethod.POST,"/foodies/followCreator/{creator_id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/foodies/unFollowCreator/{creator_id}").permitAll()
				.requestMatchers(HttpMethod.GET, "/creators/list/creatorRange/{qty}").permitAll()
				.requestMatchers(HttpMethod.POST,"/creators/signUp/**").permitAll()

				// to handle posts - public
				.requestMatchers(HttpMethod.GET,"/posts/{post_no}").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/search/title").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/search/category").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/{creator_id}/list").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/list").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/list/recipeRange/{qty}").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/listAll").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/listAll/categories").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/list/categoryRange/{qty}").permitAll()
				.requestMatchers(HttpMethod.GET,"/posts/*/list/").permitAll()
				.requestMatchers(HttpMethod.POST,"/posts/new/").permitAll()
				.requestMatchers(HttpMethod.PUT,"/posts/*/update/").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/posts/*/delete/").permitAll()
				
				
				.requestMatchers(HttpMethod.GET,"/engagement/comment/new").permitAll()
				.requestMatchers(HttpMethod.GET,"/engagement/comment/{post_id}/listAll").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/engagement/comment/{comment_id}/delete").permitAll()
				.requestMatchers(HttpMethod.GET,"/engagement/rating/new").permitAll()
				.requestMatchers(HttpMethod.GET,"/engagement/rating/{post_id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/engagement/rating/{rating_id}/delete").permitAll()
//				.requestMatchers(HttpMethod.POST,"/engagement/comment/new").permitAll()
		// only admin should be able to see all patients
				// with hasRole use ADMIN else use ROLE_ADMIN
				// for more than 1 rule order matter

				.requestMatchers(HttpMethod.GET, "/patients").hasRole("ADMIN")
				// only patient can book the appointment
				.requestMatchers(HttpMethod.POST, "/appointments").hasRole("PATIENT")
//				.requestMatchers(HttpMethod.POST, "/creators/signup").hasRole("CREATOR")
//				.requestMatchers(HttpMethod.POST, "/foodies/signup").hasRole("FOODIE")
				// admin can check specific patient details
				.requestMatchers(HttpMethod.GET, "/patients/{userId}").hasAnyRole("ADMIN")
				// only doctor can change appointment status to complete & add some diag tests
				.requestMatchers(HttpMethod.POST, "/appointments/mark-complete-with-tests").hasAnyRole("DOCTOR")
				// authenticate any other remaining request
				.anyRequest().authenticated())
				// add custom jwt filter before 1st authentication filter
				// -UsernamePasswordAuthenticationFilter
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	// Configure AuthManager as spring bean - required/used bysignIN in user
	// controller
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	// configure PasswordEncoder as spring bean
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

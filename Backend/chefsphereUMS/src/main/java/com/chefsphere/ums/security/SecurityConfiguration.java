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
		/*
		 * configure public end points [ unprotected public api no auth] For eg: no
		 * endpoint will be accessible as not enpoint is public available without auth
		 * /user/** must be allowed for auth /swagger for testing .. etc
		 */

		request.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/users/pwd-encryption", "/auth/signIn",
				"/auth/checkUsername/{username}", "/auth/checkEmail/{email}","/admin/**").permitAll()
				// in flight request from React front end extra request sent by react
				.requestMatchers(HttpMethod.OPTIONS).permitAll()

				/*
				 * Auth
				 */
				.requestMatchers(HttpMethod.GET, "/auth/imgkToken").hasAnyAuthority("CREATOR", "FOODIE", "ADMIN")

				/*
				 * Admin
				 */
//				.requestMatchers(HttpMethod.GET, "/admin/**").hasAnyAuthority("ADMIN")
//				.requestMatchers(HttpMethod.POST, "/admin/**").hasAnyAuthority("ADMIN")
//				.requestMatchers(HttpMethod.DELETE, "/admin/**").hasAnyAuthority("ADMIN")

				/*
				 * User
				 */
				.requestMatchers(HttpMethod.GET, "/user/details").hasAnyAuthority("CREATOR", "FOODIE", "ADMIN")
				.requestMatchers(HttpMethod.PUT, "/user/update").hasAnyAuthority("CREATOR", "FOODIE", "ADMIN")

				/*
				 * Foodie
				 */
				.requestMatchers(HttpMethod.GET, "/foodies/listAll").hasAnyAuthority("ADMIN")
				.requestMatchers(HttpMethod.POST, "/foodies/signUp").permitAll()

				/*
				 * Creator
				 */
				.requestMatchers(HttpMethod.GET, "/creators/{id}").permitAll()
				.requestMatchers(HttpMethod.GET, "/creators/list/creatorRange/{qty}").permitAll()
				.requestMatchers(HttpMethod.POST, "/creators/signUp").permitAll()
				// only creator and admin can access these
				.requestMatchers(HttpMethod.DELETE, "/creators/delete").hasAnyAuthority("CREATOR", "ADMIN")

				/*
				 * Posts
				 */
				.requestMatchers(HttpMethod.GET, "/posts/{post_no}").permitAll()
				.requestMatchers(HttpMethod.GET, "/posts/search/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/posts/{creator_id}/list").permitAll()
				.requestMatchers(HttpMethod.GET, "/posts/list").hasAnyAuthority("CREATOR", "ADMIN")
				.requestMatchers(HttpMethod.GET, "/posts/list/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/posts/listAll/**").permitAll()
				.requestMatchers(HttpMethod.POST, "/posts/new").hasAnyAuthority("CREATOR", "ADMIN")
				.requestMatchers(HttpMethod.PUT, "/posts/{post_id}/update").hasAnyAuthority("CREATOR", "ADMIN")
				.requestMatchers(HttpMethod.DELETE, "/posts/{post_id}/delete").hasAnyAuthority("CREATOR", "ADMIN")

				/*
				 * ENGAGEMENT
				 * 
				 * Comments
				 */
				.requestMatchers(HttpMethod.GET, "/engagement/comment/{post_id}/listAll").permitAll()
				.requestMatchers(HttpMethod.POST, "/engagement/comment/new")
				.hasAnyAuthority("CREATOR", "FOODIE", "ADMIN")
				// only auth user can delete comments
				.requestMatchers(HttpMethod.DELETE, "/engagement/comment/{comment_id}/delete")
				.hasAnyAuthority("CREATOR", "FOODIE", "ADMIN")

				/*
				 * Ratings
				 */
				.requestMatchers(HttpMethod.GET, "/engagement/rating/{post_id}").permitAll()
				.requestMatchers(HttpMethod.POST, "/engagement/rating/new").hasAnyAuthority("FOODIE", "ADMIN")
				.requestMatchers(HttpMethod.DELETE, "/engagement/rating/{rating_id}/delete").hasAnyAuthority("ADMIN")
				.requestMatchers(HttpMethod.GET, "/engagement/follow/allFollowers").hasAnyAuthority("CREATOR", "ADMIN")
				.requestMatchers(HttpMethod.GET, "/engagement/follow/{creator_id}/totalfollowers").permitAll()
				.requestMatchers(HttpMethod.GET, "/engagement/follow/doesFollow/{creator_id}")
				.hasAnyAuthority("FOODIE", "ADMIN").requestMatchers(HttpMethod.GET, "/engagement/follow/allFollowing")
				.hasAnyAuthority("FOODIE", "ADMIN")
				.requestMatchers(HttpMethod.POST, "/engagement/follow/followCreator/{creator_id}")
				.hasAnyAuthority("FOODIE", "ADMIN")
				.requestMatchers(HttpMethod.DELETE, "/engagement/follow/unFollowCreator/{creator_id}")
				.hasAnyAuthority("FOODIE", "ADMIN")

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

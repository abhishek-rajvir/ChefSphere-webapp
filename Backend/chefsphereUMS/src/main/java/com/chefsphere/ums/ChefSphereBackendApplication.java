package com.chefsphere.ums;

import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
//one of the annotations - @SpringBootConfiguration => it's Spring boot config class , where you can add @Bean methods to declare spring beans
public class ChefSphereBackendApplication {

	@Value("${frontend.url}")
	private String frontEndUrl;

	public static void main(String[] args) {
		SpringApplication.run(ChefSphereBackendApplication.class, args);
	}

	// configure ModelMapper class as a spring bean
	@Bean // exactly equivalent to - <bean id......../>
	ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration() // get default config
				.setPropertyCondition(Conditions.isNotNull()) // transfer only not null props from src-> dest
				.setMatchingStrategy(MatchingStrategies.STRICT);// transfer the props form src -> dest which match by
																// name & data type

		return mapper;
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();

		//front end port
	    config.setAllowedOrigins(List.of(frontEndUrl));
		// methods allowed [get,post,..]
	    config.setAllowedMethods(List.of("*"));
		// allowed headers
	    config.setAllowedHeaders(List.of("*"));

	    UrlBasedCorsConfigurationSource source =
	        new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);

	    return source;
	}


}

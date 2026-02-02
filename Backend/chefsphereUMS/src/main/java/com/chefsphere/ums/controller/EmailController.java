package com.chefsphere.ums.controller;

import com.chefsphere.ums.dto.MailRequestDto;
import com.chefsphere.ums.dto.OtpRequestDto;
import com.chefsphere.ums.dto.ValidateRequestDto;
import com.chefsphere.ums.service.MailService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")

// initialises all dependencies
@AllArgsConstructor
// annotation for logging
@Slf4j
public class EmailController {

	// dependency
	// final avoid nullptr exception
	private final MailService mailService;

	// post request
	@PostMapping("/new")
	public ResponseEntity<?> newMail(@Valid @RequestBody MailRequestDto dto) {
		mailService.sendMail(dto);
        log.info("Mail sent to {}", dto.getEmail());
		return ResponseEntity.ok("Mail composed to "+dto.getEmail());
	}

	@PostMapping("/otp")
	public ResponseEntity<?> newOtp(@Valid @RequestBody OtpRequestDto dto) {
		mailService.sendOtp(dto);
		log.info("Otp sent to {}",dto.getEmail());
		return ResponseEntity.ok("Otp sent to "+dto.getEmail());
	}

	@PostMapping("/validate")
	public ResponseEntity<?> validateOtp(@Valid @RequestBody ValidateRequestDto dto) {
		mailService.validateOtp(dto);
		log.info("Otp and validated and Password reset for {}",dto.getEmail());
		return ResponseEntity.ok("Mail validated..");
	}
}

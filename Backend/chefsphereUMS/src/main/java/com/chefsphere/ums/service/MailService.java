package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.MailRequestDto;
import com.chefsphere.ums.dto.OtpRequestDto;
import com.chefsphere.ums.dto.ValidateRequestDto;
import jakarta.validation.Valid;

public interface MailService {
	void sendOtp(OtpRequestDto dto);
	
	void validateOtp(ValidateRequestDto dto) ;

	void sendMail(MailRequestDto dto);
}

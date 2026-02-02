package com.chefsphere.ums.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@AllArgsConstructor
public class OtpServiceImpl implements OtpService {

	public Integer generateOtp() {
		Random random = new Random();
		return 100000 + random.nextInt(900000);
	}
}

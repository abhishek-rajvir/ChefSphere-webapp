package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.MailRequestDto;
import com.chefsphere.ums.dto.OtpRequestDto;
import com.chefsphere.ums.dto.ValidateRequestDto;
import com.chefsphere.ums.exception_handler.InvalidEmailException;
import com.chefsphere.ums.exception_handler.InvalidOtpException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@AllArgsConstructor
class OtpData {
	private final int otp;
	private final Instant generatedAt;
}

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

	private final JavaMailSender javaMailSender;
	private final OtpService otpService;
	private final UserService userService;

	@Value("${spring.mail.username}")
	private String fromMail;

	// OTP stored per email for multiple users
	private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();

	private static final String MAIL_SUBJECT = "Your OTP for Password Reset – ChefSphere";

	@Override
	public void sendMail(MailRequestDto dto) {

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromMail);
		message.setTo(dto.getEmail());
		message.setSubject(dto.getSubject());
		message.setText(buildMailBody(dto.getMessage()));

		javaMailSender.send(message);
	}

	@Override
	public void sendOtp(OtpRequestDto dto) {

		int otp = otpService.generateOtp();
		Instant generatedAt = Instant.now();

		// store OTP per user
		otpStore.put(dto.getEmail(), new OtpData(otp, generatedAt));

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromMail);
		message.setTo(dto.getEmail());
		message.setSubject(MAIL_SUBJECT);
		message.setText(buildOtpBody(otp));

		javaMailSender.send(message);
	}

	@Override
	public void validateOtp(ValidateRequestDto dto){
		
		OtpData data = otpStore.get(dto.getEmail());
		if (data == null) {
			throw new InvalidEmailException("Otp was not generated for this email address");
		}

		boolean notExpired = Duration.between(data.getGeneratedAt(), Instant.now()).toMinutes() < 10;

		boolean matches = String.valueOf(data.getOtp()).equals(dto.getOtp());

		// optional: remove OTP after successful validation
		if (notExpired && matches) {
			otpStore.remove(dto.getEmail());
			userService.updateUserPassword(dto.getEmail(),dto.getPassword());
			return;
		}
		throw new InvalidOtpException("Mail validation failed Invalid Otp");
	}

	// helper method
	private String buildMailBody(String message) {
		return """
				%s

				Happy cooking,
				ChefSphere Team 👨‍🍳
				Where creators and food lovers come together
				""".formatted(message);
	}

	// helper method
	private String buildOtpBody(int otp) {
		return """
				Hello,

				We received a request to reset your ChefSphere account password.

				Please use the following One-Time Password (OTP) to proceed:

				🔐 OTP: %s

				This OTP is valid for 10 minutes.
				For your security, please do not share this OTP with anyone.

				If you did not request a password reset, you can safely ignore this email.

				Happy cooking,
				ChefSphere Team 👨‍🍳
				Where creators and food lovers come together
				""".formatted(otp);
	}

}

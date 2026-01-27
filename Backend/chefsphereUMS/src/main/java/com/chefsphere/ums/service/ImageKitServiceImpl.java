package com.chefsphere.ums.service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.exception_handler.ImageKitException;

@Service
public class ImageKitServiceImpl {

	@Value("${imagekit.public-key}")
	private String publicKey;
	@Value("${imagekit.private-key}")
	private String privateKey;
    @Value("${imagekit.url-endpoint}")
    private String urlEndpoint;

    public Map<String, String> authenticate() {
        try {
            String token = UUID.randomUUID().toString();
            long expire = (System.currentTimeMillis() / 1000) + 600; // 10 minutes

            String data = token + expire;

            Mac mac = Mac.getInstance("HmacSHA1");
            SecretKeySpec secretKey = new SecretKeySpec(
                privateKey.getBytes(StandardCharsets.UTF_8),
                "HmacSHA1"
            );
            mac.init(secretKey);

            byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            String signature = bytesToHex(rawHmac);

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("expire", String.valueOf(expire));
            response.put("signature", signature);
            response.put("publicKey",publicKey);
            response.put("url-endpoint",urlEndpoint);

            return response;
        } catch (Exception e) {
            throw new ImageKitException("Failed to generate ImageKit signature");
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hex = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }
}

package com.chefsphere.ums.service;

import com.chefsphere.ums.exception_handler.YoutubeApiException;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@NoArgsConstructor
public class YoutubeApiServiceImpl implements YoutubeApiService{
	
	@Override
	public String verifyURL(String url){
		RestTemplate restTemplate = new RestTemplate();
		String vID = extractYouTubeVideoId(url);
		String api = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v="+vID+"&format=json";
		try {
			restTemplate.getForObject(api, String.class);
			String iframe = String.format(
				    "<iframe width='256' height='144' " +
				    	    "src='https://www.youtube.com/embed/%s' " +
				    	    "frameborder='0' " +
				    	    "allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope' " +
				    	    "allowfullscreen></iframe>",
				    	    vID
				    	);

			return iframe;
		}
		catch (RestClientException e) {
			throw new YoutubeApiException("Invalid video id OR no network access ");
		}
	}

	@Override
	public String extractYouTubeVideoId(String youtubeUrl) {
	    if (youtubeUrl == null || youtubeUrl.isBlank()) {
	        return null;
	    }

	    String regex =
	        "(?:youtube\\.com\\/(?:.*[?&]v=|(?:v|embed)\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{11})";

	    Pattern pattern = Pattern.compile(regex);
	    Matcher matcher = pattern.matcher(youtubeUrl);

	    return matcher.find() ? matcher.group(1) : null;
	}

	
}

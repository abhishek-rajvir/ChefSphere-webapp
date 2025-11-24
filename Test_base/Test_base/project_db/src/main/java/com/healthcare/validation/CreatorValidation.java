package com.healthcare.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.healthcare.dto.UrlData;

public class CreatorValidation {
	private RestTemplate rest = new RestTemplate();
	
	public boolean isValidateYoutubeUrl(String url) {
				
		
		// Extract video id from link
	    String pattern = "(?<=v=)[^&]+|(?<=youtu.be/)[^?]+|(?<=embed/)[^?]+";
	    Pattern compiledPattern = Pattern.compile(pattern);
	    Matcher matcher = compiledPattern.matcher(url);

	    if (matcher.find()) {
	    	String embeded = """
	    			<iframe
					  width="640"
					  height="320"
					  src="https://www.youtube.com/embed/VIDEO_ID"
					  title=""
					  frameborder="0"
					  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					  allowfullscreen>
					</iframe>
    			""";
	        String videoId = matcher.group();
	        
//O	        String check = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v="+videoId+"&format=json";
	        UrlData data = getUrlDataFromApi(videoId);
	        embeded.replace("title=\"\"", "title=\"" + data.getTitle() + "\"");
	        embeded.replace("src=\"https://www.youtube.com/embed/VIDEO_ID\"",
	                  "src=\"https://www.youtube.com/embed/" + videoId + "\"");
	        
	        System.out.println(embeded);
	    }
		
		return false;
	}
	
	public UrlData getUrlDataFromApi(String videoId) {
        try {
            return rest.getForObject(
            		"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v="+videoId+"&format=json", UrlData.class);
        } catch (RestClientException e) {
            System.out.println("Error fetching data: " + e.getMessage());
            return null;
        }
	}
}

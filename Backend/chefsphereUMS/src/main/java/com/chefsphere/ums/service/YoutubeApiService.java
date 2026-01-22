package com.chefsphere.ums.service;

public interface YoutubeApiService {
	
	public String verifyURL(String url);
	
	public String extractYouTubeVideoId(String youtubeUrl) ;
	
}

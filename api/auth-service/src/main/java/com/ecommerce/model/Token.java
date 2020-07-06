package com.ecommerce.model;

public class Token {
	private String accessToken;

	public Token() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Token(String accessToken) {
		super();
		this.accessToken = accessToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

}

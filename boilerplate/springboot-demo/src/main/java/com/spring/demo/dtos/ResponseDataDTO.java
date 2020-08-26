package com.spring.demo.dtos;


public class ResponseDataDTO<T> {
	private int code;
	private String message;
	private T Data;

	public ResponseDataDTO(Result result) {
		this.code = result.getCode();
		this.message = result.getMessage();
	}

	public ResponseDataDTO(int code, String message, T data) {
		super();
		this.code = code;
		this.message = message;
		Data = data;
	}

	public ResponseDataDTO() {
		super();
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return Data;
	}

	public void setData(T data) {
		Data = data;
	}
}

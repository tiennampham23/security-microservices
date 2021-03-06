package com.ecommerce.model;

public enum Status {
	SUCCESS(1, "Thành công"),
	CANCEL(2, "Huỷ"),
	WAITING(3, "Đang chờ");
	
	private int code;
	private String message;
	
	Status(int code, String message){
		this.code = code;
		this.message = message;
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
	
	public boolean isSuccess() {
		return (this.code==1);
	}
}

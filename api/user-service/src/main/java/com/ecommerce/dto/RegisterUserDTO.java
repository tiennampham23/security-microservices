package com.ecommerce.dto;

public class RegisterUserDTO {
	private String userName;
	private String password;
	private String address;
	private String phone;
	private String fullName;

	public RegisterUserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RegisterUserDTO(String userName, String password, String address, String phone, String fullName) {
		super();
		this.userName = userName;
		this.password = password;
		this.address = address;
		this.phone = phone;
		this.fullName = fullName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

}

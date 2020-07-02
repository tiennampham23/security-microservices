package com.ecommerce.dto;

import java.util.List;

public class OrderDTO {
	private List<OrderProductDTO> listProducts;
	
	private String address;
	
	private String phone;
	
	
	public OrderDTO(List<OrderProductDTO> listProducts, String address, String phone) {
		super();
		this.listProducts = listProducts;
		this.address = address;
		this.phone = phone;
	}



	public List<OrderProductDTO> getListProducts() {
		return listProducts;
	}



	public void setListProducts(List<OrderProductDTO> listProducts) {
		this.listProducts = listProducts;
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
}

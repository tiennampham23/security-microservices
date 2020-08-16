package com.ecommerce.dto;

import java.util.List;

public class SeriesDTO {
	private List<Integer> data;
	private String name;
	public List<Integer> getData() {
		return data;
	}
	
	
	public SeriesDTO() {
		super();
		// TODO Auto-generated constructor stub
	}


	public SeriesDTO(List<Integer> data, String name) {
		super();
		this.data = data;
		this.name = name;
	}



	public void setData(List<Integer> data) {
		this.data = data;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	
}

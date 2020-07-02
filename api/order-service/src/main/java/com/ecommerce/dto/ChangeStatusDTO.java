package com.ecommerce.dto;

import java.util.List;

public class ChangeStatusDTO {
	private List<Integer> listOrderId;
	private String status;

	public List<Integer> getListOrderId() {
		return listOrderId;
	}

	public void setListOrderId(List<Integer> listOrderId) {
		this.listOrderId = listOrderId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ChangeStatusDTO(List<Integer> listOrderId, String status) {
		super();
		this.listOrderId = listOrderId;
		this.status = status;
	}

}

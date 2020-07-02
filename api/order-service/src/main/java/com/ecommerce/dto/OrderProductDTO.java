package com.ecommerce.dto;

public class OrderProductDTO {
	private int productId;
	private int amount;
	private float totalPrice;

	public OrderProductDTO(int productId, int amount, float totalPrice) {
		super();
		this.productId = productId;
		this.amount = amount;
		this.setTotalPrice(totalPrice);
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

}
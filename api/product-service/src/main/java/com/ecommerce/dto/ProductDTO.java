package com.ecommerce.dto;

import org.springframework.web.multipart.MultipartFile;

public class ProductDTO {
	private MultipartFile thumbnail;
	private int id;
	private String productName;
	private String description;
	private float price;
	private int amount;
	private int categoryId;
	private int supplierId;

	public ProductDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ProductDTO(MultipartFile thumbnail, int id, String productName, String description, float price, int amount,
			int categoryId, int supplierId) {
		super();
		this.thumbnail = thumbnail;
		this.id = id;
		this.productName = productName;
		this.description = description;
		this.price = price;
		this.amount = amount;
		this.categoryId = categoryId;
		this.supplierId = supplierId;
	}

	public MultipartFile getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(MultipartFile thumbnail) {
		this.thumbnail = thumbnail;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

}

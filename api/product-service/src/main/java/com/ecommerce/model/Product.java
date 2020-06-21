package com.ecommerce.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "product", schema = "dbo", catalog = "ecommerce-store")
public class Product implements Serializable {
	private int id;
	private String productName;
	private String description;
	private String thumbnail;
	private float price;
	private int amount;
	private int categoryId;
	private int supplierId;

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Product(int id, String productName, String description, String thumbnail, float price, int amount,
			int categoryId, int supplierId) {
		super();
		this.id = id;
		this.productName = productName;
		this.description = description;
		this.thumbnail = thumbnail;
		this.price = price;
		this.amount = amount;
		this.categoryId = categoryId;
		this.supplierId = supplierId;
	}

	@Id
	@Column(name = "id")
	@TableGenerator(name = "gen_id", table = "HIBERNATE_GEN_ID", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "gen_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "productname")
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "thumbnail")
	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	@Column(name = "price")
	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	@Column(name = "amount")
	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	@Column(name = "categoryid")
	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	@Column(name = "supplierid")
	public int getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

}

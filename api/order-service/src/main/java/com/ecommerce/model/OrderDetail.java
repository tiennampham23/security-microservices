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
@Table(name = "orderdetail", schema = "dbo", catalog = "ecommercestore")
public class OrderDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;
	private int orderId;
	private int productId;
	private float totalPrice;
	private int amount;

	public OrderDetail() {
		super();
	}


	public OrderDetail(int id, int orderId, int productId, float totalPrice, int amount) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.productId = productId;
		this.totalPrice = totalPrice;
		this.amount = amount;
	}


	public OrderDetail(int orderId, int productId, float totalPirce, int amount) {
		super();
		this.orderId = orderId;
		this.productId = productId;
		this.totalPrice = totalPirce;
		this.amount = amount;
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

	@Column(name = "orderid")
	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	@Column(name = "productid")
	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	@Column(name = "totalprice")
	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPirce) {
		this.totalPrice = totalPirce;
	}

	@Column(name = "amount")
	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

}

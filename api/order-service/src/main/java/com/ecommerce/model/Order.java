package com.ecommerce.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "order", schema = "dbo", catalog = "ecommercestore")
public class Order implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private int userId;
	private float totalPrice;
	private Timestamp createdDate;
	private String address;
	private String phone;
	private String status;

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Order(int userId, float totalPrice, Timestamp createdDate, String address, String phone, String status) {
		super();
		this.userId = userId;
		this.totalPrice = totalPrice;
		this.createdDate = createdDate;
		this.address = address;
		this.phone = phone;
		this.status = status;
	}

	public Order(int id, int userId, float totalPrice, Timestamp createdDate, String address, String phone,
			String status) {
		super();
		this.id = id;
		this.userId = userId;
		this.totalPrice = totalPrice;
		this.createdDate = createdDate;
		this.address = address;
		this.phone = phone;
		this.status = status;
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

	@Column(name = "userid")
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Column(name = "totalprice")
	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Column(name = "createddate")
	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	@Column(name = "address")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "phone")
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Column(name = "status")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}

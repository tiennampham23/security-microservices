package com.ecommerce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "supplier", schema = "dbo", catalog = "ecommercestore")
public class Supplier {
	private int id;
	private String supplierName;

	public Supplier() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Supplier(int id, String supplierName) {
		super();
		this.id = id;
		this.supplierName = supplierName;
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

	@Column(name = "suppliername")
	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	
	
}

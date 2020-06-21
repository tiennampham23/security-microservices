package com.ecommerce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "category", schema = "dbo", catalog = "ecommercestore")
public class Category {
	private int id;
	private String categoryName;

	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(int id, String categoryName) {
		super();
		this.id = id;
		this.categoryName = categoryName;
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

	@Column(name = "categoryname")
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

}

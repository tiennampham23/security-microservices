package com.ecommerce.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class CreateProductDTO {
	private int id;
	private String productName;
	private String description;
	private String thumbnail;
	private float price;
	private int amount;
	private int categoryId;
	private int supplierId;
}

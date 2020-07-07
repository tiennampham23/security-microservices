package com.ecommerce.service.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.service.ProductService;
import com.ecommerce.util.FileExtension;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;

	private Logger LOGGER = LoggerFactory.getLogger(ProductServiceImpl.class);

	@Override
	public List<Product> getAll() {
		return productRepository.findAll();
	}

	@Override
	public Page<Product> getPageable(Pageable pageable, String keywords) {
		if (keywords == null) {
			keywords = "";
		}
		return productRepository.findAllByProductNameLike(pageable, "%" + keywords + "%");
	}

	@Override
	public Optional<Product> getProductById(int id) {
		// TODO Auto-generated method stub
		return productRepository.findById(id);
	}

	@Override
	public int create(ProductDTO productDTO) {
		String pathImage = null;
		if (productDTO.getThumbnail() != null) {
			pathImage = FileExtension.saveFile(productDTO.getThumbnail(), "products");
		}

		Product product = new Product(productDTO.getProductName(), productDTO.getDescription(), pathImage,
				productDTO.getPrice(), productDTO.getAmount(), productDTO.getCategoryId(), productDTO.getSupplierId());

		try {
			productRepository.save(product);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		}

		return 0;
	}

	@Override
	public int update(ProductDTO productDTO, int id) {
		Product existProduct = productRepository.getOne(id);
		String pathImage = null;
		if (productDTO.getThumbnail() != null) {
			pathImage = FileExtension.saveFile(productDTO.getThumbnail(), "products");
		}

		if (pathImage != null) {
			existProduct.setThumbnail(pathImage);
		}

		existProduct.setAmount(productDTO.getAmount());
		existProduct.setProductName(productDTO.getProductName());
		existProduct.setDescription(productDTO.getDescription());
		existProduct.setPrice(productDTO.getPrice());
		existProduct.setCategoryId(productDTO.getCategoryId());
		existProduct.setSupplierId(productDTO.getSupplierId());

		try {
			productRepository.save(existProduct);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		}

		return 0;
	}

	@Override
	public List<Product> getProductsByCategoryId(String categoryId) {
		List<Product> products = null;
		try {
			products = productRepository.getProductsByCategoryId(categoryId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return products;
	}

	@Override
	public List<Product> getProductsBySupplierId(String supplierId) {
		List<Product> products = null;
		try {
			products = productRepository.getProductsBySupplierId(supplierId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return products;
	}

}

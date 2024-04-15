package com.store.groceryApp.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.groceryApp.dtos.ProductDto;
import com.store.groceryApp.entities.ProductEntity;
import com.store.groceryApp.repository.ProductRepository;

@Service
public class ProductServiceImpl {
    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    public ProductDto getProductByName(String productName) {
        ProductEntity productEntity = productRepository.findByName(productName);
        return productEntity != null ? new ProductDto(productEntity) : null;
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getProductsByCategory(String category) {
        List<ProductEntity> productEntities = productRepository.findByCategory(category);
        return productEntities.stream()
            .map(ProductDto::new)
            .collect(Collectors.toList());
    }
}

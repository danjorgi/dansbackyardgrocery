package com.store.groceryApp.services;

import java.util.List;

import com.store.groceryApp.dtos.ProductDto;
import com.store.groceryApp.entities.ProductEntity;

public interface ProductService {

    ProductDto getProductByName(String productName);

    List<ProductDto> getProductsByCategory(String category);

    void addToCart(Long productId, Long userId, int quantity);

    void addProduct(ProductDto productDto);

    void deleteProduct(Long productId);

    void updatePrice(Long productId, double newPrice);

    void updateStockQuantity(Long productId, int newStockQuantity);

    List<ProductEntity> getAllProductsAlphabetically();
}
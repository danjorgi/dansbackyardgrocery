package com.store.groceryApp.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.groceryApp.dtos.ProductDto;
import com.store.groceryApp.entities.CartEntity;
import com.store.groceryApp.entities.ProductEntity;
import com.store.groceryApp.entities.UserEntity;
import com.store.groceryApp.repository.CartRepository;
import com.store.groceryApp.repository.ProductRepository;
import com.store.groceryApp.repository.UserRepository;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    @Transactional(readOnly = true)
    public ProductDto getProductByName(String productName) {
        ProductEntity productEntity = productRepository.findByName(productName);
        return productEntity != null ? new ProductDto(productEntity) : null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDto> getProductsByCategory(String category) {
        List<ProductEntity> productEntities = productRepository.findByCategory(category);
        return productEntities.stream()
            .map(ProductDto::new)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addToCart(Long productId, Long userId, int quantity) {
        ProductEntity product = productRepository.findById(productId).orElse(null);
        UserEntity user = userRepository.findById(userId).orElse(null);
        if (product != null && user != null) {
            CartEntity existingCartItem = cartRepository.findByUserAndProduct(user, product);
            if(existingCartItem != null) {
                existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
                cartRepository.save(existingCartItem);
            } else {
                CartEntity cartItem = new CartEntity();
                cartItem.setUser(user);
                cartItem.setProduct(product);
                cartItem.setQuantity(quantity);
                cartRepository.save(cartItem);
            }
        }
    }

    @Override
    @Transactional
    public void addProduct(ProductDto productDto) {
        ProductEntity productEntity = new ProductEntity(productDto);
        productRepository.save(productEntity);
    }

    @Override
    @Transactional
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    @Transactional
    public void updatePrice(Long productId, double newPrice) {
        ProductEntity productEntity = productRepository.findById(productId).orElse(null);
        if (productEntity != null) {
            productEntity.setPrice(newPrice);
            productRepository.save(productEntity);
        }
    }

    @Override
    @Transactional
    public void updateStockQuantity(Long productId, int newStockQuantity) {
        ProductEntity productEntity = productRepository.findById(productId).orElse(null);
        if (productEntity != null) {
            productEntity.setStockQuantity(newStockQuantity);
            productRepository.save(productEntity);
        }
    }

    public List<ProductEntity> getAllProductsAlphabetically() {
        return productRepository.findAllByOrderByName();
    }
}

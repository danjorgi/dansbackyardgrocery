package com.store.groceryApp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.groceryApp.dtos.ProductDto;
import com.store.groceryApp.entities.ProductEntity;
import com.store.groceryApp.services.ProductService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
   
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{productName}")
    public List<ProductDto> getProductsByName(@PathVariable String productName) {
        return productService.getProductsByName(productName);
    }

    @GetMapping("/category/{category}")
    public List<ProductDto> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @PostMapping("/addToCart")
    public void addToCart(@RequestParam Long productId,
                          @RequestParam Long userId,
                          @RequestParam int quantity) {
        productService.addToCart(productId, userId, quantity);
    }

    @PostMapping("/add")
    public void addProduct(@RequestBody ProductDto productDto) {
        productService.addProduct(productDto);
    }

    @DeleteMapping("/{productId}")
    public void detletProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
    }

    @PutMapping("/{productId}/price")
    public void updatePrice(@PathVariable Long productId,
                            @RequestParam double newPrice) {
        productService.updatePrice(productId, newPrice);
    }

    @PutMapping("/{productId}/stock")
    public void updateStockQuantity(@PathVariable Long productId,
                                    @RequestParam int newStockQuantity) {
            productService.updateStockQuantity(productId, newStockQuantity);
    }

    @GetMapping
    public List<ProductDto> getAllProducts(@RequestParam(required = false) String name) {
        if (name != null && !name.isEmpty()) {
            return productService.getProductsByName(name);
        } else {
            List<ProductEntity> products = productService.getAllProductsAlphabetically();
            return products.stream()
                           .map(ProductDto::new)
                           .collect(Collectors.toList());
        }
    }
}

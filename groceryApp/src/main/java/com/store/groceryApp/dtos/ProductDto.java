package com.store.groceryApp.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.store.groceryApp.entities.ProductEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int stockQuantity;
    private String imageUrl;
    private String category;
    private boolean admin;
    private UserDto userDto;
    private Set<CartDto> cartDtoSet = new HashSet<>();

    public ProductDto(ProductEntity product) {
        if (product.getId() != null) {
            this.id = product.getId();
        }
        if (product.getName() != null) {
            this.name = product.getName();
        }
        if (product.getDescription() != null) {
            this.description = product.getDescription();
        }
        this.price = product.getPrice();
        this.stockQuantity = product.getStockQuantity();
        if (product.getImageUrl() != null) {
            this.imageUrl = product.getImageUrl();
        }
        if (product.getCategory() != null) {
            this.category = product.getCategory();
        }
        if (product.getAdmin() != null) {
            this.admin = product.getAdmin().isAdmin();
            this.userDto = new UserDto(product.getAdmin());
        } 
    }
}

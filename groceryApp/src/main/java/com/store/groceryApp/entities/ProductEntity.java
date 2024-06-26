package com.store.groceryApp.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.store.groceryApp.dtos.ProductDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "category", length = 50)
    private String category;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<CartEntity> cartSet = new HashSet<>();

    public ProductEntity(ProductDto productDto) {
        if (productDto.getName() != null) {
            this.name = productDto.getName();
        }
        if (productDto.getDescription() != null) {
            this.description = productDto.getDescription();
        }
        this.price = productDto.getPrice();
        this.stockQuantity = productDto.getStockQuantity();
        if (productDto.getImageUrl() != null) {
            this.imageUrl = productDto.getImageUrl();
        }
        if (productDto.getCategory() != null) {
            this.category = productDto.getCategory();
        }
    }
}

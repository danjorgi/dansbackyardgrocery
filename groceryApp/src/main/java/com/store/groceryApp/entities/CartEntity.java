package com.store.groceryApp.entities;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.store.groceryApp.dtos.CartDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "timestamp", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp timestamp;

    public CartEntity(CartDto cartDto) {
        if (cartDto.getUserDto() != null) {
            this.user = new UserEntity(cartDto.getUserDto());
        }
        if (cartDto.getProductDto() != null) {
            this.product = new ProductEntity(cartDto.getProductDto());
        }
        this.quantity = cartDto.getQuantity();
        this.timestamp = cartDto.getTimestamp();
    }
}

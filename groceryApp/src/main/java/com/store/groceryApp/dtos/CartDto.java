package com.store.groceryApp.dtos;

import java.io.Serializable;
import java.sql.Timestamp;

import com.store.groceryApp.entities.CartEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto implements Serializable {
    private Long id;
    private Long user_id;
    private Long product_id;
    private int quantity;
    private Timestamp timestamp;
    private UserDto userDto;
    private ProductDto productDto;

    public CartDto(CartEntity cart) {
        if(cart.getId() != null) {
            this.id = cart.getId();
        }
        if (cart.getUser() != null && cart.getUser().getId() != null) {
            this.user_id = cart.getUser().getId();
            this.userDto = new UserDto(cart.getUser());
        }
        if (cart.getProduct() != null && cart.getProduct().getId() != null) {
            this.product_id = cart.getProduct().getId();
            this.productDto = new ProductDto(cart.getProduct());
        }
        this.quantity = cart.getQuantity();
        this.timestamp = cart.getTimestamp();
    }
}

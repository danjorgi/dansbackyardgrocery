package com.store.groceryApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.groceryApp.entities.CartEntity;
import com.store.groceryApp.services.CartService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    
    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public List<CartEntity> viewCartItems(@PathVariable Long userId) {
        return cartService.viewCartItems(userId);
    }

    @DeleteMapping("/{cartItemId}")
    public void deleteCartItem(@PathVariable Long cartItemId) {
        cartService.deleteCartItem(cartItemId);
    }

    @PutMapping("/{cartItemId}")
    public void updateCartItemQuantity(@PathVariable Long cartItemId,
                                       @RequestParam int newQuantity) {
        cartService.updateCartItemQuantity(cartItemId, newQuantity);
    }

    @PostMapping("/completeOrder/{userId}")
    public void compelteOrder(@PathVariable Long userId) {
        cartService.completeOrder(userId);
    }
}

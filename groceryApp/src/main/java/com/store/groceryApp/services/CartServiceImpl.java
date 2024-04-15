package com.store.groceryApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.groceryApp.entities.CartEntity;
import com.store.groceryApp.entities.UserEntity;
import com.store.groceryApp.repository.CartRepository;
import com.store.groceryApp.repository.UserRepository;

@Service
public class CartServiceImpl {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CartEntity> viewCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void deleteCartItem(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    public void updateCartItemQuantity(Long cartItemId, int newQuantity) {
        CartEntity cartItem = cartRepository.findById(cartItemId).orElse(null);
        if (cartItem != null) {
            cartItem.setQuantity(newQuantity);
            cartRepository.save(cartItem);
        }
    }

    public void completeOrder(long userId) {
        List<CartEntity> cartItems = cartRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            System.out.println("Your cart is empty. Please add items before completing your order.");
            return;
        }
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            System.out.println("Your order has been placed. Items will be shipped to the following address: " + user.getUserAddress());
    
            cartRepository.deleteAll(cartItems);
        } else {
            System.out.println("User with ID " + userId + " not found.");
        }
    }
}

package com.store.groceryApp.services;

import java.util.List;

import com.store.groceryApp.entities.CartEntity;

public interface CartService {

    List<CartEntity> viewCartItems(Long userId);

    void deleteCartItem(Long cartItemId);

    void updateCartItemQuantity(Long cartItemId, int newQuantity);

    void completeOrder(long userId);

}
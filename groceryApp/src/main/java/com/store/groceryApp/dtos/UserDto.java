package com.store.groceryApp.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.store.groceryApp.entities.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Long id;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userPassword;
    private boolean admin;
    private Set<ProductDto> productDtoSet = new HashSet<>();
    private Set<CartDto> cartDtoSet = new HashSet<>();

    public UserDto(UserEntity user) {
        if (user.getId() != null) {
            this.id = user.getId();
        }
        if (user.getUserName() != null) {
            this.userName = user.getUserName();
        }
        if (user.getUserEmail() != null) {
            this.userEmail = user.getUserEmail();
        }
        if (user.getUserAddress() != null) {
            this.userAddress = user.getUserAddress();
        }
        if (user.getUserPassword() != null) {
            this.userPassword = user.getUserPassword();
        }
        this.admin = user.isAdmin();
    }
}

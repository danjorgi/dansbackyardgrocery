package com.store.groceryApp.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.store.groceryApp.dtos.UserDto;

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
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", length = 50)
    private String userName;

    @Column(name = "user_email", length = 100)
    private String userEmail;

    @Column(name = "user_address", length = 100)
    private String userAddress;

    @Column(name = "user_password", length = 100)
    private String userPassword;

    @Column(name = "admin")
    private boolean admin;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<CartEntity> cartSet = new HashSet<>();

    public UserEntity(UserDto userDto) {
        if (userDto.getUserName() != null) {
            this.userName = userDto.getUserName();
        }
        if (userDto.getUserEmail() != null) {
            this.userEmail = userDto.getUserEmail();
        }
        if (userDto.getUserAddress() != null) {
            this.userAddress = userDto.getUserAddress();
        }
        if (userDto.getUserPassword() != null) {
            this.userPassword = userDto.getUserPassword();
        }
        this.admin = userDto.isAdmin();
    }
}

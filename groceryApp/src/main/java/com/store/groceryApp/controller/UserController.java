package com.store.groceryApp.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.groceryApp.dtos.UserDto;
import com.store.groceryApp.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public List<String> addUser(@RequestBody UserDto userDto) {
        System.out.println("Recieved UserDto: " + userDto);
        
        if(!StringUtils.hasText(userDto.getUserPassword())) {
            System.out.println("Password is null or empty");
            return Collections.singletonList("Password cannot be null or empty");
        }

        String passHash = passwordEncoder.encode(userDto.getUserPassword());
        userDto.setUserPassword(passHash);
        System.out.println("Encoded Password: " + passHash);
        return userService.addUser(userDto);
    }

    @PostMapping("/login")
    public List<String> userLogin(@RequestBody UserDto userDto) {
        return userService.userLogin(userDto);
    }

    @PostMapping("/logout")
    public List<String> userLogout(@RequestBody UserDto userDto) {
        return userService.userLogout(userDto);
    }
}

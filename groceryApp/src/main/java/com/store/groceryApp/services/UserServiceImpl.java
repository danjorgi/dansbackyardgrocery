package com.store.groceryApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.groceryApp.dtos.UserDto;
import com.store.groceryApp.entities.UserEntity;
import com.store.groceryApp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public List<String> addUser(UserDto userDto) {
        List<String> response = new ArrayList<>();
        UserEntity user = new UserEntity(userDto);
        userRepository.saveAndFlush(user);
        response.add("User added Successfully");
        return response;
    }

    @Override
public List<String> userLogin(UserDto userDto) {
    List<String> response = new ArrayList<>();
    Optional<UserEntity> userOptional = userRepository.findByUsername(userDto.getUserName());
    if (userOptional.isPresent()) {
        UserEntity user = userOptional.get();
        if (passwordEncoder.matches(userDto.getUserPassword(), user.getUserPassword())) {
            if (user.isAdmin()) {
                response.add("Admin Login Successfull");
            } else {
                response.add("User Login Successfull");
            }
            response.add(String.valueOf(user.getId()));
        } else {
            response.add("Username or password incorrect");
        }
    } else {
        response.add("Username or password incorrect");
    }
    return response;
}
}

package com.store.groceryApp.services;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.store.groceryApp.dtos.UserDto;

public interface UserService {

    List<String> addUser(UserDto userDto);

    List<String> userLogin(UserDto userDto);

}
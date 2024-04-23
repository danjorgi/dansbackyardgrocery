package com.store.groceryApp.services;

import java.util.List;

import com.store.groceryApp.dtos.UserDto;

public interface UserService {

    List<String> addUser(UserDto userDto);

    List<String> userLogin(UserDto userDto);

    List<String> userLogout(UserDto userDto);
}
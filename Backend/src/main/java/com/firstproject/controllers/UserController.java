package com.firstproject.controllers;

import com.firstproject.entities.UserEntity;
import com.firstproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userservies;

    @PostMapping
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {
        return userservies.createUser(user);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
    	return userservies.getUserById(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUserById(@PathVariable int id, @RequestBody UserEntity user) {
        return userservies.updateUserById(id, user);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable int id){
    	return userservies.deleteUserById(id);
    }
    @PostMapping("/login")
    public ResponseEntity<UserEntity> login( @RequestParam String email,@RequestParam String password) {
        return userservies.loginUser(email, password);
    }
}

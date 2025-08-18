package com.firstproject.services;

import com.firstproject.entities.UserEntity;
import com.firstproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

@Service
public class UserService {
	
	@Autowired
    UserRepository userRepository;

    public ResponseEntity<UserEntity> createUser(UserEntity user) {
        // 201 Created - New user created successfully
        return ResponseEntity.status(201).body(userRepository.save(user));
    }
    
    public ResponseEntity<UserEntity> getUserById(int id) {
        Optional<UserEntity> user = userRepository.findById(id);
        if (user.isPresent())
            // 200 OK - User found
            return ResponseEntity.status(200).body(user.get());
        else
            // 404 Not Found - User doesn't exist
            return ResponseEntity.status(404).build();
    }
    
    public ResponseEntity<UserEntity> updateUserById(int id, UserEntity user){
        Optional<UserEntity> u = userRepository.findById(id);
        if (u.isPresent()) {
            UserEntity existingUser = u.get();

            existingUser.setName(user.getName());
            existingUser.setPhone(user.getPhone());
            existingUser.setPassword(user.getPassword()); 
            UserEntity updatedUser = userRepository.save(existingUser);

            // 200 OK - User updated successfully
            return ResponseEntity.status(200).body(updatedUser);
        } else {
            // 404 Not Found - Can't update non-existent user
            return ResponseEntity.status(404).build();
        }
    }
    
    public ResponseEntity<String> deleteUserById(int id) {
        Optional<UserEntity> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            userRepository.deleteById(id);
            // 204 No Content - Deletion successful (returning 204, no body)
            return ResponseEntity.status(204).build();
        } else {
            // 404 Not Found - Can't delete non-existent user
            return ResponseEntity.status(404).body("User not found");
        }
    }
    
    public boolean login(String email, String password) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && userOpt.get().getPassword().equals(password);
    }
    
    public ResponseEntity<UserEntity> loginUser(String email, String password) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return ResponseEntity.status(201).body(userOpt.get());
        } else {
            return ResponseEntity.status(404).build();
        }
    }

}

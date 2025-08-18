package com.firstproject.repositories;

import org.springframework.data.repository.CrudRepository;
import com.firstproject.entities.UserEntity;
import java.util.Optional;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {
	Optional<UserEntity> findByEmail(String email);
}
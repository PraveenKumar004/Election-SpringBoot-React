package com.firstproject.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firstproject.entities.VotersEntity;
import com.firstproject.entities.UserEntity;
import com.firstproject.entities.ElectionEntity;

public interface VotersRepository extends JpaRepository <VotersEntity, Integer> {
	Optional<VotersEntity> findByUserAndElection(UserEntity user,ElectionEntity election);
}
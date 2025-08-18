package com.firstproject.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firstproject.entities.*;

public interface VoteRepository extends JpaRepository<VoteEntity,Integer> {
	Optional<VoteEntity> findByVoterAndElection(UserEntity user,ElectionEntity election);
}

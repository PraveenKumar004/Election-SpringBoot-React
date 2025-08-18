package com.firstproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firstproject.entities.*;
import java.util.*;

public interface CandidateRepository extends JpaRepository<CandidateEntity, Integer> {
	Optional<CandidateEntity> findByUserAndElection(UserEntity user, ElectionEntity election);
	List<CandidateEntity> findByElection_Id(int id);
	List<CandidateEntity> findByUser_Id(int id);
	Optional<CandidateEntity> findTopByElection_IdOrderByCountDesc(int electionId); 
}

package com.firstproject.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firstproject.entities.WinnerEntity;
import com.firstproject.entities.CandidateEntity;

public interface WinnerRepository extends JpaRepository <WinnerEntity, Integer> {
	
}
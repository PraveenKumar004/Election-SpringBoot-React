package com.firstproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firstproject.entities.ElectionEntity;
import java.util.*;

public interface ElectionRepository extends JpaRepository<ElectionEntity, Integer> {
	List<ElectionEntity> findByCreatedBy_Id(int userId);
}
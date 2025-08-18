package com.firstproject.services;

import com.firstproject.repositories.ElectionRepository;
import com.firstproject.repositories.UserRepository;
import com.firstproject.repositories.VotersRepository;

import com.firstproject.entities.ElectionEntity;
import com.firstproject.entities.UserEntity;
import com.firstproject.entities.VotersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.*;

@Service
public class ElectionService {

    @Autowired
    private ElectionRepository electionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VotersRepository votersRepository;

    public ResponseEntity<ElectionEntity> createElection(ElectionEntity electionEntity, int userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        
        if (user.isPresent()) {
            
            if (!electionEntity.isPrivate()) {
                electionEntity.setUsername(null);
            }
            
            electionEntity.setCreatedBy(user.get());
            
            ElectionEntity savedElection = electionRepository.save(electionEntity);
 
            if(electionEntity.isPrivate()) {
                String[] str = electionEntity.getUsername().split(",");
                for(String s : str) {
                    Optional<UserEntity> userDetails = userRepository.findByEmail(s.trim());
                    if(userDetails.isPresent()) {
                        VotersEntity voter = new VotersEntity();
                        voter.setElection(electionEntity);
                        voter.setUser(userDetails.get());
                        votersRepository.save(voter);
                    }
                }
            }
            
            // 201 Created - Election successfully created
            return ResponseEntity.status(201).body(savedElection);
        } else {
            // 404 Not Found - User who creates election not found
            return ResponseEntity.status(404).build();
        }
    }

    


    public ResponseEntity<ElectionEntity> updateElection(ElectionEntity electionEntity, int id) {
        Optional<ElectionEntity> optionalElection = electionRepository.findById(id);
        if (optionalElection.isPresent()) {
            ElectionEntity existingElection = optionalElection.get();

            existingElection.setTitle(electionEntity.getTitle());
            existingElection.setOneDescription(electionEntity.getOneDescription());
            existingElection.setDescription(electionEntity.getDescription());
            existingElection.setImageUrl(electionEntity.getImageUrl());
            existingElection.setPrivate(electionEntity.isPrivate());
            existingElection.setElectionStartTime(electionEntity.getElectionStartTime());
            existingElection.setElectionEndTime(electionEntity.getElectionEndTime());
            existingElection.setCandidateStartTime(electionEntity.getCandidateStartTime());
            existingElection.setCandidateEndTime(electionEntity.getCandidateEndTime());

            ElectionEntity updatedElection = electionRepository.save(existingElection);

            // 200 OK - Election successfully updated
            return ResponseEntity.status(200).body(updatedElection);

        } else {
            // 404 Not Found - Cannot update non-existent election
            return ResponseEntity.status(404).build();
        }
    }

    public ResponseEntity<Void> deleteElection(int id) {
        Optional<ElectionEntity> optionalElection = electionRepository.findById(id);
        if (optionalElection.isPresent()) {
            electionRepository.deleteById(id);
            // 204 No Content - Successfully deleted
            return ResponseEntity.status(204).build();
        } else {
            // 404 Not Found - No election to delete
            return ResponseEntity.status(404).build(); 
        }
    }
    
    public ResponseEntity<ElectionEntity> getElectionById(int id) {
        Optional<ElectionEntity> optionalElection = electionRepository.findById(id);
        if (optionalElection.isPresent()) {
            return ResponseEntity.status(200).body(optionalElection.get()); 
        } else {
            return ResponseEntity.status(404).build(); 
        }
    }
    
    public ResponseEntity<List<ElectionEntity>> getAllElections() {
        List<ElectionEntity> elections = electionRepository.findAll();
        return ResponseEntity.ok(elections);
    }
    
    public ResponseEntity<List<ElectionEntity>> getElectionsByUserId(int userId) {
        List<ElectionEntity> elections = electionRepository.findByCreatedBy_Id(userId);
        return ResponseEntity.ok(elections);
    }

    
    
}

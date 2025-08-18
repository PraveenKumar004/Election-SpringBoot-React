package com.firstproject.services;

import com.firstproject.entities.ElectionEntity;
import com.firstproject.entities.UserEntity;
import com.firstproject.entities.CandidateEntity;
import com.firstproject.entities.VotersEntity;
import com.firstproject.entities.WinnerEntity;
import com.firstproject.repositories.CandidateRepository;
import com.firstproject.repositories.ElectionRepository;
import com.firstproject.repositories.UserRepository;
import com.firstproject.repositories.VotersRepository;
import com.firstproject.repositories.WinnerRepository;

import java.util.*;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

@Service
public class CandidateServices {
	@Autowired
    private ElectionRepository electionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private VotersRepository votersRepository;
    
    @Autowired
    private WinnerRepository winnerRepository;
    
    public ResponseEntity<Void> createCandidate(CandidateEntity candidate, int userId, int electionId){
    	Optional<UserEntity> user = userRepository.findById(userId);
    	Optional<ElectionEntity> election = electionRepository.findById(electionId);
    	LocalDateTime now = LocalDateTime.now();
    	
    	if (user.isEmpty() || election.isEmpty()) {
    	    return ResponseEntity.status(404).build();
    	}
    	
    	if(election.get().isPrivate()) {
    		Optional<VotersEntity> voter = votersRepository.findByUserAndElection(user.get(),election.get());
    		
    		if(!voter.isPresent()) 
    			// 403 Forbidden - user is not allowed to register as candidate in private election
    			return ResponseEntity.status(403).build();
    	}
    	
    	Optional<CandidateEntity> existing = candidateRepository.findByUserAndElection(user.get(), election.get());

    	if(existing.isPresent())  {
    		// 409 Conflict - candidate already exists
    		return ResponseEntity.status(409).build();
    	}
    	
        if (now.isAfter(election.get().getCandidateStartTime()) && now.isBefore(election.get().getCandidateEndTime())) {
    		candidate.setUser_id(user.get());
    		candidate.setElection_id(election.get());
    		System.out.println(candidate.getPromises()+" "+candidate.getElection_id());
    		candidateRepository.save(candidate);
    		return ResponseEntity.status(201).build();
        } 
        
        // 400 Bad Request - candidate registration not allowed at this time
        return ResponseEntity.status(400).build();
    }
    
    public ResponseEntity<List<CandidateEntity>> getCandidateByElection(int id){
    	List<CandidateEntity> candiadte = candidateRepository.findByElection_Id(id);
    	return ResponseEntity.ok(candiadte);
    }
    
    public ResponseEntity<List<CandidateEntity>> getCandidateByUser(int id){
    	List<CandidateEntity> candiadte = candidateRepository.findByUser_Id(id);
    	return ResponseEntity.ok(candiadte);
    }
    
    public ResponseEntity<Void> updateStatus(int id,String status){
    	Optional<CandidateEntity> existing = candidateRepository.findById(id);
    	if(existing.isPresent() && existing.get().getStatus().toLowerCase().equals("pending")) {
    		existing.get().setStatus(status);
    		candidateRepository.save(existing.get());
    		return ResponseEntity.status(201).build();
    	}
    	return ResponseEntity.status(404).build();
    }
    
    public ResponseEntity<Void> deleteCandidate(int id) {
        Optional<CandidateEntity> existing = candidateRepository.findById(id);

        if (existing.isPresent()) {
            candidateRepository.deleteById(id);
            return ResponseEntity.status(204).build(); // 204 No Content
        }

        return ResponseEntity.status(404).build(); // 404 Not Found
    }
    
    public ResponseEntity<Void> winner(int id){
    	Optional<CandidateEntity> winner= candidateRepository.findTopByElection_IdOrderByCountDesc(id);
    	WinnerEntity winnerentity = new WinnerEntity();
    	winnerentity.setCandidate(winner.get());
    	return ResponseEntity.status(201).build();
    }
}


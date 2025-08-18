package com.firstproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.*;

import com.firstproject.repositories.*;

import com.firstproject.entities.*;
import java.time.LocalDateTime;

@Service
public class VoteService {
	
	@Autowired
	ElectionRepository electionRepository;	
	@Autowired
	UserRepository userRepository;	
	@Autowired
	VoteRepository voteRepository;
	@Autowired
	CandidateRepository candidateRepository;
	@Autowired
	VotersRepository votersRepository;
	
	public ResponseEntity<Void> makeVote(int userId, int electionId, int candidateId) {
		Optional<UserEntity> user = userRepository.findById(userId);
		Optional<ElectionEntity> election = electionRepository.findById(electionId);
		Optional<CandidateEntity> candidate = candidateRepository.findById(candidateId);

		// 404 Not Found - if any of the required entities are missing
		if (user.isEmpty() || election.isEmpty() || candidate.isEmpty()) {
			return ResponseEntity.status(404).build();
		}

		Optional<VoteEntity> existing = voteRepository.findByVoterAndElection(user.get(), election.get());
		
		LocalDateTime now = LocalDateTime.now();

		// 403 Forbidden - voting not allowed outside election time
		if (now.isBefore(election.get().getElectionStartTime()) || now.isAfter(election.get().getElectionEndTime())) {
			return ResponseEntity.status(403).build();
		}

		// 409 Conflict - user already voted in this election
		if (existing.isPresent()) {
			return ResponseEntity.status(409).build();
		}

		if (election.get().isPrivate()) {
			Optional<VotersEntity> voter = votersRepository.findByUserAndElection(user.get(), election.get());

			// 403 Forbidden - user is not allowed to vote in private election
			if (voter.isEmpty()) {
				return ResponseEntity.status(403).build();
			}
		}
		if(candidate.get().getStatus().toLowerCase().equals("approved")) {
		VoteEntity vote = new VoteEntity();
		vote.setVoter(user.get());
		vote.setElection(election.get());
		vote.setCandidate(candidate.get());
		voteRepository.save(vote);
		
		candidate.get().setCount(candidate.get().getCount()+1);
		candidateRepository.save(candidate.get());
		
		// 201 Created - vote successfully submitted
		return ResponseEntity.status(201).build();
		}else return ResponseEntity.status(404).build();
		
	}
}

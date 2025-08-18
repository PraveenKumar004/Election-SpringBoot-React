package com.firstproject.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.firstproject.services.CandidateServices;
import com.firstproject.entities.CandidateEntity;

@RestController
@RequestMapping("/candidate")
public class CandidateController {
	
	@Autowired
	CandidateServices candidateService;
	
	@PostMapping("/register/{userId}/{electionId}")
	public ResponseEntity<Void> createElection(@RequestBody CandidateEntity candidate,@PathVariable int userId, @PathVariable int electionId){
		return candidateService.createCandidate(candidate,userId,electionId);
	}
	
	@GetMapping("/by_election/{id}")
	public ResponseEntity<List<CandidateEntity>> getAllElections(@PathVariable int id) {
	    return candidateService.getCandidateByElection(id);
	}
	
	@GetMapping("/by_user/{id}")
	public ResponseEntity<List<CandidateEntity>> getByUserId(@PathVariable int id) {
	    return candidateService.getCandidateByUser(id);
	}
	
	@PutMapping("/updatestatus/{id}")
	public ResponseEntity<Void> updateStatus(@PathVariable int id, @RequestBody  String status){
		return candidateService.updateStatus(id, status);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCandidate(@PathVariable int id) {
	    return candidateService.deleteCandidate(id);
	}

}

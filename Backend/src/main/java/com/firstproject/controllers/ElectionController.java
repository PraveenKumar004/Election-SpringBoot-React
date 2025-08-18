package com.firstproject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.firstproject.services.ElectionService;
import com.firstproject.entities.ElectionEntity;
import java.util.*;

@RestController
@RequestMapping("/elections")
public class ElectionController {
	
	@Autowired
	ElectionService electionService;
	
	@PostMapping("/{userId}")
	public ResponseEntity<ElectionEntity> createElection(@RequestBody ElectionEntity election,@PathVariable int userId){
		return electionService.createElection(election,userId);
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<ElectionEntity> updateElection(@RequestBody ElectionEntity election,@PathVariable int userId){
		return electionService.updateElection(election,userId);
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> deleteElection(@PathVariable int userId){
		return electionService.deleteElection(userId);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ElectionEntity> getElection(@PathVariable int id){
	    return electionService.getElectionById(id);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<ElectionEntity>> getAllElections() {
	    return electionService.getAllElections();
	}
	
	@GetMapping("/user/{userId}")
    public ResponseEntity<List<ElectionEntity>> getElectionsByUser(@PathVariable int userId) {
        return electionService.getElectionsByUserId(userId);
    }


	
}

package com.firstproject.controllers;

import com.firstproject.services.VoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/vote")
public class VoteController {

	@Autowired
	VoteService voteService;

    @PostMapping("/{userId}/{electionId}/{candidateId}")
    public ResponseEntity<Void> makeVote(@PathVariable int userId, @PathVariable int electionId, @PathVariable int candidateId){
    	return voteService.makeVote(userId, electionId, candidateId);
    }
}

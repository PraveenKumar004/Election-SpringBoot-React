package com.firstproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.firstproject.repositories.WinnerRepository;
import com.firstproject.entities.WinnerEntity;
import com.firstproject.entities.CandidateEntity;

import java.util.List;

@Service
public class WinnerServices {

    @Autowired
    private WinnerRepository winnerRepository;

    public ResponseEntity<WinnerEntity> createWinner(CandidateEntity candidate) {
        WinnerEntity winner = new WinnerEntity();
        winner.setCandidate(candidate);

        WinnerEntity savedWinner = winnerRepository.save(winner);
        return ResponseEntity.status(201).body(savedWinner);
    }

    public ResponseEntity<List<WinnerEntity>> getAllWinners() {
        List<WinnerEntity> winners = winnerRepository.findAll();
        return ResponseEntity.ok(winners);
    }
}

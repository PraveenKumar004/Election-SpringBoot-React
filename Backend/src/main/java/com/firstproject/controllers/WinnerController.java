package com.firstproject.controllers;

import com.firstproject.entities.CandidateEntity;
import com.firstproject.entities.WinnerEntity;
import com.firstproject.services.WinnerServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/winner")
public class WinnerController {

    @Autowired
    private WinnerServices winnerServices;

    @PostMapping
    public ResponseEntity<WinnerEntity> createWinner(@RequestBody CandidateEntity candidate) {
        return winnerServices.createWinner(candidate);
    }

    @GetMapping
    public ResponseEntity<List<WinnerEntity>> getAllWinners() {
        return winnerServices.getAllWinners();
    }
}

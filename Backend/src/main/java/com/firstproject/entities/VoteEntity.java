package com.firstproject.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class VoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private UserEntity voter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( nullable = false)
    private CandidateEntity candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private ElectionEntity election;

    private LocalDateTime createdAt = LocalDateTime.now();



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserEntity getVoter() {
        return voter;
    }

    public void setVoter(UserEntity voter) {
        this.voter = voter;
    }

    public CandidateEntity getCandidate() {
        return candidate;
    }

    public void setCandidate(CandidateEntity candidate) {
        this.candidate = candidate;
    }

    public ElectionEntity getElection() {
        return election;
    }

    public void setElection(ElectionEntity election) {
        this.election = election;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

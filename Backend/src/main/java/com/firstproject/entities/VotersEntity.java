package com.firstproject.entities;

import jakarta.persistence.*;

@Entity

public class VotersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
  
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private ElectionEntity election;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public ElectionEntity getElection() {
        return election;
    }

    public void setElection(ElectionEntity election) {
        this.election = election;
    }


}

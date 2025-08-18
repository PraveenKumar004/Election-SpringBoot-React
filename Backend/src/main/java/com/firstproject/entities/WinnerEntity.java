package com.firstproject.entities;
import jakarta.persistence.*;

@Entity
public class WinnerEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private CandidateEntity candidate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public CandidateEntity getCandidate() {
		return candidate;
	}

	public void setCandidate(CandidateEntity candidate) {
		this.candidate = candidate;
	}
	
}

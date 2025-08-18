package com.firstproject.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ElectionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String oneDescription;
    private String description;
    private String imageUrl; 
    private boolean isPrivate;
    private String username;
    
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	private LocalDateTime electionStartTime;
    private LocalDateTime electionEndTime;
    private LocalDateTime candidateStartTime;
    private LocalDateTime candidateEndTime;
    
    
    @ManyToOne()
    @JoinColumn(nullable = false)
    private UserEntity createdBy;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getOneDescription() {
		return oneDescription;
	}

	public void setOneDescription(String oneDescription) {
		this.oneDescription = oneDescription;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public boolean isPrivate() {
		return isPrivate;
	}

	public void setPrivate(boolean isPrivate) {
		this.isPrivate = isPrivate;
	}

	public LocalDateTime getElectionStartTime() {
		return electionStartTime;
	}

	public void setElectionStartTime(LocalDateTime electionStartTime) {
		this.electionStartTime = electionStartTime;
	}

	public LocalDateTime getElectionEndTime() {
		return electionEndTime;
	}

	public void setElectionEndTime(LocalDateTime electionEndTime) {
		this.electionEndTime = electionEndTime;
	}

	public LocalDateTime getCandidateStartTime() {
		return candidateStartTime;
	}

	public void setCandidateStartTime(LocalDateTime candidateStartTime) {
		this.candidateStartTime = candidateStartTime;
	}

	public LocalDateTime getCandidateEndTime() {
		return candidateEndTime;
	}

	public void setCandidateEndTime(LocalDateTime candidateEndTime) {
		this.candidateEndTime = candidateEndTime;
	}

	public UserEntity getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(UserEntity createdBy) {
		this.createdBy = createdBy;
	}

    
    
}


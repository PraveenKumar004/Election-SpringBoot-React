package com.firstproject.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;



@Entity
public class CandidateEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private UserEntity user;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private ElectionEntity election;
	
	private String promises;
	private String status = "Pending";
	private int count=0;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	private LocalDateTime createdAt = LocalDateTime.now();
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public UserEntity getUser_id() {
		return user;
	}
	public void setUser_id(UserEntity user_id) {
		this.user = user_id;
	}
	public ElectionEntity getElection_id() {
		return election;
	}
	public void setElection_id(ElectionEntity election_id) {
		this.election= election_id;
	}
	public String getPromises() {
		return promises;
	}
	public void setPromises(String promises) {
		this.promises = promises;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}

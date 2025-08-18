
function CandidateCard({ candidate, onVote }) {
  return (
    <div className="candidate-card">
      <img
        src={candidate.image }
        alt={candidate.name}
        className="candidate-photo"
      />
      <h3>{candidate.name}</h3>
      <p>{candidate.description}</p>
      {onVote && (
        <button onClick={() => onVote(candidate.id)} className="btn-vote">
          Vote
        </button>
      )}
    </div>
  );
}

export default CandidateCard;

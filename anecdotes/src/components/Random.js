import React from "react";

export default function Random({anecdotes, selected, vote, handleVote, handleNext}) {
  
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
        <br />
        has {vote[selected]} votes
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
    </>
  )
}
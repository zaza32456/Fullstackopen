import React from "react";

export default function Mostvote({anecdotes, vote}) {

  //获取投票数最高的名言的下标
  const max = Math.max(...vote);
  let mostid = vote.findIndex(i => i == max)

  if (max !== 0) {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <div>
          {anecdotes[mostid]}
          <br />
          has {vote[mostid]} votes
        </div>
      </>
    )
  }else {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>No vote given</p>
      </>
    )
  }
}
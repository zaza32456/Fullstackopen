import React from "react";

export default function Course({course}) {
  let exs = course.parts.map(n => n.exercises)
  console.log(exs)
  let total = exs.reduce((a, b) => a + b, 0)

  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map(part => 
        <p key={part.id}>
        {part.name} {part.exercises}
        </p>
      )}
      <b>total of {total} exercises</b> 

    </>
  )
}
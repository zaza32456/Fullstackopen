import React from "react"
import Header from "./components/Header"
import Contents from "./components/Content"
import Total from "./components/Total"

export default function App() {
  const course = 'Half Stack application development'
  let parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Contents parts={parts} />
      <Total parts={parts} />
    </>
  );
}


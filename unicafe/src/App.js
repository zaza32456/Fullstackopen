import React , { useState } from "react"
import Title from './components/Title'
import Button from './components/Button'
import Display from './components/StatisticLine'
import Statistics from './components/Statistics'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    console.log(good)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    console.log(neutral)
  }

  const handleBad = () => {
    setBad(bad + 1)
    console.log(bad)
  }

  return (
   <>
    <Title title="give feedback"/>
    <Button onclick={handleGood} feedback="good"/>
    <Button onclick={handleNeutral}feedback="neutral"/>
    <Button onclick={handleBad} feedback="bad"/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
   </>
  );
}


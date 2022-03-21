import React from "react"
import StatisticLine from "./StatisticLine"
import Title from "./Title"

export default function Statistics({good, neutral, bad}) {
    if (good + neutral + bad === 0) {
        return (
            <>
                <Title title="statistics"/>
                <p>No feedback given</p>
            </>
        )
    }
    return (
        <>
            <Title title="statistics"/>
            <table>
                <tbody>
                    <tr><StatisticLine text="good" info={good}/></tr>
                    <tr><StatisticLine text="neutral" info={neutral}/></tr>
                    <tr><StatisticLine text="bad" info={bad}/></tr>
                    <tr><StatisticLine text="all" info={good + neutral + bad}/></tr>
                    <tr><StatisticLine text="average" info={((good - bad)/(good + neutral + bad)).toFixed(1)}/></tr>
                    <tr><StatisticLine text="positive" info={(good * 100 /(good + neutral + bad)).toFixed(1) + " %"}/></tr>
                </tbody>
            </table>
        </>

    )
}
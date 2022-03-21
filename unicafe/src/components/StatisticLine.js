import React from "react"

export default function StatisticLine({ text, info }) {
    return (
        <>
            <td>{text}</td>
            <td>{info}</td>
        </>
    )
}
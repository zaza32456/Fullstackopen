import React from "react"

export default function Button({onclick, feedback}) {
    return (
        <button onClick={onclick}>{feedback}</button>
    )
}
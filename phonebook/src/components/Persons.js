import React from 'react'

export default function Persons({persons, findStr}) {
    return (
        <>
        {persons
            .filter(n => findStr.test(n.name))
            .map(n => 
            <p key={n.name}>{n.name} {n.number}</p>
          )}
        </>
    )
}
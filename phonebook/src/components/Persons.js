import React from 'react'
import Deleteperson from './Deleteperson'

export default function Persons({persons, findStr, del}) {
    return (
        <>
        {persons
            .filter(n => findStr.test(n.name))
            .map(n => 
            <p key={n.name}>{n.name} {n.number} <Deleteperson id={n.id} name={n.name} del={del}/> </p>
            
          )}
        </>
    )
}
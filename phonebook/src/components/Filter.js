import React from 'react'

export default function Filter({findPerson, find}) {
    return (
        <div>
        filter shown with <input onChange={findPerson} value={find} />
      </div>
    )
}
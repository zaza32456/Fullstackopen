import React from 'react'

export default function PersonForm({addNote, inputName, inputNumber,newName, newNumber}) {
    return (
        <form onSubmit={addNote}>
        <div>
          name: <input onChange={inputName} value={newName}/> 
        </div>
        <div>
          number: <input onChange={inputNumber} value={newNumber}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
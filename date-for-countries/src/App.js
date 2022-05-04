import { useState } from 'react';
import "./App.css"
import { Filter } from './components/Filter';

function App() {
  const [text, setText] =useState("")
  const handleFilter = (e) => {
    setText(e.target.value)
  }

  // console.log("text = ",text)

  return (
    <div>
      <div className='filter-div'>
        <label htmlFor="country">find countries</label>
        <input id="country" name='country' value={text} onChange={handleFilter}></input>
      </div>
      <Filter text={text}/>
    </div>
  );
}

export default App;

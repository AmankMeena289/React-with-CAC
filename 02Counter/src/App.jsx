import { useState } from 'react'
import './App.css'

function App() {
  // Declaring state with a default value of 15
  const [counter, setCounter] = useState(15)

  // Function to increment the counter
  const addValue = () => {
    if(counter <10){
    // Exact approach shown in the video: passing the updated value to setCounter
    setCounter(counter + 1)
    }
  }

  // Function to decrement the counter
  const removeValue = () => {
    if(counter >0 ) {
    setCounter(counter - 1)
    }
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={removeValue}>Remove value {counter}</button>
      
      <p>footer: {counter}</p>
    </>
  )
}

export default App
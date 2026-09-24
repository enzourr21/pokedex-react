import { useState } from 'react'
import Pokedex from "./components/Pokedex";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokedex />
    </>
  )
}

export default App

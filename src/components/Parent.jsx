import React from 'react'
import { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }

  return (
    <div>
      <p>Count: {count}</p>
      <Child onIncrement={handleIncrement}/>
    </div>
  )
}

export default Parent

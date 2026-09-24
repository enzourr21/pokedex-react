import React from 'react'

const Child = (props) => {
    return (
        <button onClick={props.onIncrement}>+1</button>
    )
}

export default Child


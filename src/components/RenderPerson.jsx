import React from 'react'

const RenderPerson = (props) => {
  return (
    <div>
      <h2> Hi I am {props.currentP.name} I am {props.currentP.age} and I work as {props.currentP.job}</h2>
    </div>
  )
}

export default RenderPerson

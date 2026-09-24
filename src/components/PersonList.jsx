import React from 'react'
import RenderPerson from './RenderPerson.jsx'

const PersonList = () => {
    const persons = [
        {name: 'Juan', age: 20, job: 'Engineer'},
        {name: 'Naruto', age: 19, job: 'Shinobi'},
        {name: 'Ichigo', age: 21, job: 'Substitute Soul Reaper'}
    ]
    const personList = persons.map(person => <RenderPerson currentP={person}/>)
  return <div>{personList}</div>
}

export default PersonList

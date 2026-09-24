import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Greet from './components/Greet.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import Counter from './components/Counter.jsx'
import Parent from './components/Parent.jsx'
import PersonList from './components/PersonList.jsx'
import LoginForm from './components/LoginForm.jsx'
import PokeAPI from './components/PokeAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*<Greet firstName="Enzo" lastName="Machutes"/>
    <ProfileCard name="Zei" age="16" jTitle="Assistant Manager" loc="Rizal"/>*/}
    <Counter></Counter>
    {/*<Parent></Parent>*/}
    {/*<PersonList/>*/}
    {/*<LoginForm/>*/}
    {/*<PokeAPI></PokeAPI>*/}
  </StrictMode>
)

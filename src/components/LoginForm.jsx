import React from 'react'
import { useState, useEffect } from 'react'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedin, setisLoggedin] = useState(false);

    useEffect(() => {
        if(isLoggedin){
            document.title = `Welcome ${email}`;
        }
        document.title = 'Log in';
    }, [isLoggedin, email])

    useEffect(() => {
        const timer = setTimeout(() =>{
            setError('');
        }, 3000)

        return () => clearTimeout(timer);
    }, [error])

    const handleSubmit = () => {
        if (!email || !password){
            setError('Fields cannot be empty!');
            return;
        }
        if(!email.includes('@')){
            setError('Invalid Email format!');
            return;
        }
        if(password.length < 8){
            setError('Password must be at least 8 characters!');
            return;
        }

        setError('');
        setisLoggedin(true);
    }

    if(isLoggedin){
        return<h2>Welcome, {email}</h2>
    }

    return (
    <div>
        <input type='email' value={email} placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}>
        </input>

        <input type='password' value={password} placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}></input>

        <button onClick={handleSubmit}>Log in</button>

        {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}

export default LoginForm

import React from 'react';
import {useNavigate ,Link} from 'react-router';
 
const Register = () => {

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("user registered")
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="username" id='username' placeholder='Enter your Username' />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="Email" id='email' placeholder='Enter your Email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' placeholder='Enter your Password' />
          </div>
          <button className='primary-button'>Register</button>       
        </form>
        <p>already have an account ? <Link to={"/login"}>login</Link></p>
      </div>
    </main>
  )
}

export default Register
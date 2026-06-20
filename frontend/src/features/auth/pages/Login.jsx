import { useState } from 'react'
import '../auth.form.scss'
import { useNavigate,Link }from 'react-router'
import {useAuth} from "../hooks/useAuth"

const Login = () => {

    const {loading ,handleLogin} = useAuth()
    const Navigate = useNavigate()
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit =async (e)=>{
        e.preventDefault()        
        await handleLogin({email,password})
        Navigate("/")
    }  
    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }


  return (
    <main>
        <div className="form-container">

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>      
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                     type="text" id='email' placeholder='Enter your email'   />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword (e.target.value)}
                     type="password" id='password' placeholder='Enter your password'   />
                </div>

                <button className='button primary-button'>Submit</button>

            </form>
            <p>don't have an account ? <Link to={"/register"}>register</Link></p>
        </div>
    </main>
  )
}

export default Login
import React, { useState } from 'react'
import '../styling/Login.css'
import logo from '../images/logo.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const values = {
            email : email,
            nim : password
        }
        await axios.post('http://localhost:3001/student_login', values)
        .then(async result => {
            if(result.data.loginStatus){
                localStorage.setItem("studentId",result.data.id)

                await axios.get('http://localhost:3001/fetch_components/'+result.data.id)
                .then(result => {
                    if(result.data.Status){
                        localStorage.setItem("components",JSON.stringify(result.data.Result))
                        // console.log(result.data.Result)
                    } else{
                        console.log(result.data.error)
                    }
                })
                .catch(error => console.log(error))

                navigate('/dashboard/')
            } else{
                console.log(result.data.Error)
            }
        })
        .catch(error => console.log(error))
    }

  return (
    <div className='login-container'>
        <div className='reg-form'>
            <form onSubmit={handleSubmit}>
                <div className='formgroup'>
                    <label htmlFor="name"><strong>Email</strong></label>
                    <input type="email" className='inp' placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)}/>   
                </div>
                <div className='formgroup'>
                    <label htmlFor="name"> <strong>Password</strong></label>
                    <input type="password"  className='inp' placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)}/>   
                </div>
                
                <div className='button-container'>
                    <button className='btn-submit'>Login</button>
                </div>

                <div className='d-flex align-items-center justify-content-center mt-4'>
                    <label htmlFor="signup">Don't have an account ? &nbsp;
                        <a href='http://exam.goCosmic.ai/registration' target='#' style={{textDecoration:'none',fontWeight:'600'}}>
                            Sign up
                        </a>
                    </label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

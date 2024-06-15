import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiApacheflink } from "react-icons/si";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    axios.defaults.withCredentials =true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/auth/login', {
            email,
            password,
        }).then(response => {
            console.log(response);
            // Navigate to another page if signup is successful
            navigate('/');
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <span className='signlog'>

                <SiApacheflink />
                <span className='tot'>
            <span className='signZ'>Z</span>CODER
                </span>
            </span>
     
        <div className='sign-up-container'>
            <form className="form-box login" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-box">
                    <label htmlFor='email'></label>
                    <input
                        type='email'
                        autoComplete='off'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdEmail className='icon' />
                </div>
                
                <div className="input-box">
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaKey className='icon' />
                </div>
                
                
                <button type='submit' className='Login-Signup'>Login</button>
                <div className="remember-forgot">    
                    <Link to="/forgotpassword">Forgot password?</Link>
                </div>
                <div className='register-link'>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
                
                
            </form>
        </div>
        </div>
        
    );
}

export default Login;
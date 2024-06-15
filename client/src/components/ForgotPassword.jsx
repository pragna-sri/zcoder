
import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserSecret } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiApacheflink } from "react-icons/si";
const ForgotPassword = () => {


    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/auth/forgotpassword', {
            
            email,
            
        }).then(response => {
            console.log(response.data); 
            if(response.data.status){
                alert("check your email for reset password link")
                navigate('/login')
            }
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
    <form className="form-box register" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        
        
        <div className="input-box">
            <label htmlFor='email'></label>
            <input
                type='email'
                autoComplete='off'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}

            />
            < MdEmail className='icon' />
        </div>
        
        
        
        
        <button type='submit' className='Login-Signup'>Send</button>
        
        
        
    </form>
</div>
</div>
  )
}

export default ForgotPassword
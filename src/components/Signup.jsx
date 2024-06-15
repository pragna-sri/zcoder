import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserSecret } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiApacheflink } from "react-icons/si";
const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/auth/signup', {
            username,
            email,
            password,
        }).then(response => {
            console.log(response);
            // Navigate to another page if signup is successful
            navigate('/login');
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
                    <h2>Sign Up</h2>
                    <div className="input-box">
                        <label htmlFor='username'></label>
                        <input
                            type='text'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)} />
                        <FaUserSecret className='icon' />
                    </div>

                    <div className="input-box">
                        <label htmlFor='email'></label>
                        <input
                            type='email'
                            autoComplete='off'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)} />
                        <MdEmail className='icon' />
                    </div>

                    <div className="input-box">
                        <label htmlFor='password'></label>
                        <input
                            type='password'
                            placeholder='********'
                            onChange={(e) => setPassword(e.target.value)} />
                        <FaKey className='icon' />
                    </div>


                    <button type='submit' className='Login-Signup'>Sign Up</button>
                    <div className="register-link">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>


                </form>
            </div>
        </div>
    );
}

export default Signup;
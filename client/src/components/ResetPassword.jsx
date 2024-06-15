
import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate, Link , useParams} from 'react-router-dom';
import { FaUserSecret } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiApacheflink } from "react-icons/si";
const ResetPassword = () => {


    const [password, setPassword] = useState('');
    const {token} =useParams();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/auth/resetpassword/'+token, {
            
            password,
            
        }).then(response => {
            if(response.data.status){
                
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
        <h2>Reset Password</h2>
        
        
        <div className="input-box">
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaKey className='icon' />
        </div>
        
        
        
        <button type='submit' className='Login-Signup'>Reset</button>
        
        
        
    </form>
</div>
</div>
  )
}

export default ResetPassword
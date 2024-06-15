import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [techStack, setTechStack] = useState('');
    const [rating, setRating] = useState(0);
    const [favouriteLanguage, setFavouriteLanguage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3005/auth/profile', { withCredentials: true });
                setProfile(response.data);
                setTechStack(response.data.techStack || '');
                setRating(response.data.competitiveProgrammingRating || 0);
                setFavouriteLanguage(response.data.favouriteLanguage || '');
            } catch (err) {
                console.error('Error fetching profile data:', err);
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3005/auth/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating <= 0) {
            alert('Rating must be a positive integer.');
            return;
        }

        try {
            await axios.put('http://localhost:3005/auth/profile', {
                techStack,
                competitiveProgrammingRating: rating,
                favouriteLanguage,
            }, { withCredentials: true });
            alert('Profile updated successfully.');
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='profile-container'>
                <h2>Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className='profile-item'>
                        <label>Username: </label>
                        <span>{profile.username}</span>
                    </div>
                    <div className='profile-item'>
                        <label>Email: </label>
                        <span>{profile.email}</span>
                    </div>
                    <div className='profile-item'>
                        <label>Tech Stack: </label>
                        <input 
                            type='text' 
                            value={techStack} 
                            onChange={(e) => setTechStack(e.target.value)} 
                        />
                    </div>
                    <div className='profile-item'>
                        <label>Rating: </label>
                        <input 
                            type='number' 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            min='1' 
                        />
                    </div>
                    <div className='profile-item'>
                        <label>Favourite Language: </label>
                        <select 
                            value={favouriteLanguage} 
                            onChange={(e) => setFavouriteLanguage(e.target.value)}
                        >
                            <option value=''>Select a language</option>
                            <option value='C'>C</option>
                            <option value='C++'>C++</option>
                            <option value='Python'>Python</option>
                            <option value='Java'>Java</option>
                            <option value='JavaScript'>JavaScript</option>
                            <option value='Ruby'>Ruby</option>
                            <option value='Go'>Go</option>
                            <option value='Rust'>Rust</option>
                            <option value='Kotlin'>Kotlin</option>
                            <option value='Swift'>Swift</option>
                        </select>
                    </div>
                    <button type='submit'>Update Profile</button>
                    <button type='button' onClick={handleLogout}>Logout</button>
                </form>
            </div>
        </>
    );
};

export default Profile;
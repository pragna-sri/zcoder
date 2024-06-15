import axios from 'axios';

const logout = async () => {
    try {
        await axios.post('http://localhost:3005/auth/logout', null, {
            withCredentials: true,
        });
        return true; // Logout successful
    } catch (error) {
        console.error('Logout error:', error);
        return false; // Logout failed
    }
};

export default logout;
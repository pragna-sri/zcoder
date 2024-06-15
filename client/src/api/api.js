// src/api/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3005', // Replace with your server URL
});

// Add a request interceptor to include the JWT token in the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
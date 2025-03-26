import axios from 'axios';

console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL); // Add this line to debug


const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers:{
        "Authorization":`bearer ${localStorage.getItem('token')}`
    }
});

export default instance;
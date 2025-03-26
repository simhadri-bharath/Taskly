import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../context/user.context'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()

    function submitHandler(e) {
        e.preventDefault();

        axios.post('/api/user/login', { email, password })
            .then((res) => {
                if (res.data.status === 'failed') {
                    console.log('Login failed');
                    alert('Login failed. Please check your credentials and try again.');
                    return;
                }

                console.log('Login successful:', res.data);
                localStorage.setItem('token', res.data.token);

                // Update user state and navigate only after it's set
                setUser(res.data.user);

                setTimeout(() => {
                    console.log("Navigating to /task...");
                    navigate('/task');
                }, 500); // Small delay to ensure `user` updates
            })
            .catch((err) => {
                console.log(err.response?.data || err);
                navigate('/');
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">

                {/* Home Button */}
                <Link to="/" className="absolute top-2 right-4 text-blue-500 hover:underline">
                    Home
                </Link>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    )
}

export default Login

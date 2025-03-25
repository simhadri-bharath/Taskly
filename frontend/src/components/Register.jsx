import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [tc, setTc] = useState(false);

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        
        if (password !== passwordConfirmation) {
            alert("Passwords do not match!");
            return;
        }

        axios.post('/api/user/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            tc
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/login');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Register</h2>
                <form onSubmit={submitHandler}>
                    {/* Name Field */}
                    <div className="mb-3">
                        <label className="block text-gray-400 text-sm" htmlFor="name">Name</label>
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            type="text" id="name"
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label className="block text-gray-400 text-sm" htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email"
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label className="block text-gray-400 text-sm" htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password"
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password Confirmation Field */}
                    <div className="mb-3">
                        <label className="block text-gray-400 text-sm" htmlFor="password_confirmation">Confirm Password</label>
                        <input 
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            type="password" id="password_confirmation"
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="mb-3 flex items-center">
                        <input 
                            type="checkbox" id="tc" 
                            checked={tc} 
                            onChange={(e) => setTc(e.target.checked)} 
                            className="mr-2 w-4 h-4"
                        />
                        <label className="text-gray-400 text-sm" htmlFor="tc">I agree to the terms and conditions</label>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="w-full mt-4 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Register
                    </button>
                </form>

                {/* Redirect to Login Page */}
                <p className="text-gray-400 text-sm mt-3">
                    Already have an Account? 
                    <Link to='/login' className="text-blue-500 hover:underline"> Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

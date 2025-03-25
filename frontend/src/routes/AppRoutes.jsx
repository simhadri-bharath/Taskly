import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'

import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Task from '../components/Task'
const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/task" element={<Task />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes
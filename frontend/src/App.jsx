/** @format */

import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import { useStore } from './store/UserAuthstore';
import { Loader } from 'lucide-react';

function App() {
	const { authuser, ischeckingAuth, checkAuth } = useStore();
	useEffect(() => {
		checkAuth();
	}, []);
	console.log(authuser);
	if (ischeckingAuth && !authuser) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Loader className='size-10 animate-spin' />
			</div>
		);
	}
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={authuser ? <Homepage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/login'
					element={authuser ? <Navigate to='/' /> : <Login />}
				/>
				<Route
					path='/signup'
					element={!authuser ? <SignUp /> : <Navigate to='/' />}
				/>
				<Route
					path='/profile'
					element={authuser ? <Profile /> : <Navigate to='/login' />}
				/>
				<Route
					path='/setting'
					element={<Setting />}
				/>
			</Routes>
		</>
	);
}

export default App;

/** @format */

import useSound from 'use-sound';

import { useEffect } from 'react';
import { useStore } from '../store/UserAuthstore';
import {
	CircleUser,
	LogInIcon,
	LogOut,
	PersonStandingIcon,
	Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Navbar() {
	const { logout, authuser } = useStore();
	const navigate = useNavigate();
	return (
		<div>
			<nav className='navbar h-15 px-10 border-b-2 border-b-gray-900 flex items-center justify-between'>
				<img
					src='./logoname.png'
					alt=''
					className=' h-25 w-27 cursor-pointer'
					onClick={() => navigate('/')}
				/>
				<div className='flex items-center'>
					{authuser ? (
						<div className='flex items-center'>
							<div
								role='button'
								onClick={() => navigate('/setting')}
								className='  px-4 py-2 flex justify-between  rounded-md'>
								<Settings className='pr-2' /> Settings
							</div>
							<div
								className='flex cursor-pointer'
								onClick={() => {
									navigate('/profile');
								}}>
								<CircleUser className='pr-2 ' /> Profile
							</div>
							<div
								role=' button'
								onClick={logout}
								className=' px-4 py-2 flex  rounded-md ml-4 cursor-pointer'>
								<LogOut className='pr-2' />
								Logout
							</div>
						</div>
					) : (
						<div
							role='button'
							onClick={() => navigate('/setting')}
							className=' text-white px-4 py-2 flex justify-between  rounded-md'>
							<Settings className='pr-2' /> Settings
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Navbar;

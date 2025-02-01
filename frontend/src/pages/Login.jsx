/** @format */
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import AuthImage from '../components/AuthImage';
import { useState } from 'react';
import { useStore } from '../store/UserAuthstore';
import { Link } from 'react-router-dom';

function Login() {
	const [showpass, setShowpass] = useState(false);
	const { issignUp, login } = useStore();
	const [formdata, setformdata] = useState({
		email: '',
		password: '',
	});
	const validatefields = () => {
		if (formdata.email.trim() === '') {
			toast.error(' Please enter your email');
			return false;
		}
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,4}$/i.test(formdata.email)) {
			toast.error('Invalid email address');
			return false;
		}
		if (formdata.password.trim() === '') {
			toast.error(' Please enter your password');
			return false;
		}
		if (formdata.password.length < 8) {
			toast.error('Password must be at least 8 characters long');
			return false;
		}
		return true;
	};
	const handlesubmit = (e) => {
		e.preventDefault();
		const result = validatefields();
		if (result === true) {
			login(formdata);
		}
	};
	return (
		<div className='min-h-screen grid lg:grid-cols-2'>
			<div className='flex flex-col justify-center items-center px-6 sm:p-12'>
				<div className='w-full max-w-md space-y-8'>
					<div className='text-center mb-8'>
						<div className='flex flex-col items-center gap-2 group'>
							<div
								className='size-12 rounded-xl bg-primary/10 flex items-center justify-center 
		group-hover:bg-primary/20 transition-colors'>
								<img
									src='./logoo.png'
									className='size-6 text-primary'
									alt=''
								/>
							</div>
							<h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
							<p className='text-base-content/60'>
								Get started with your free account
							</p>
						</div>
					</div>

					<form
						onSubmit={handlesubmit}
						className='space-y-6'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text font-medium'>Email</span>
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='size-5 text-base-content/40' />
								</div>
								<input
									type='email'
									className={`input input-bordered w-full pl-10`}
									placeholder='you@example.com'
									value={formdata.email}
									onChange={(e) =>
										setformdata({ ...formdata, email: e.target.value })
									}
								/>
							</div>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text font-medium'>Password</span>
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='size-5 text-base-content/40' />
								</div>
								<input
									type={showpass ? 'text' : 'password'}
									className={`input input-bordered w-full pl-10`}
									placeholder='••••••••'
									value={formdata.password}
									onChange={(e) =>
										setformdata({ ...formdata, password: e.target.value })
									}
								/>
								<button
									type='button'
									className='absolute inset-y-0 right-0 pr-3 flex items-center'
									onClick={() => setShowpass(!showpass)}>
									{showpass ? (
										<EyeOff className='size-5 text-base-content/40' />
									) : (
										<Eye className='size-5 text-base-content/40' />
									)}
								</button>
							</div>
						</div>

						<button
							type='submit'
							className='btn btn-primary w-full'
							disabled={issignUp}>
							{issignUp ? (
								<>
									<Loader2 className='size-5 animate-spin' />
									Loading...
								</>
							) : (
								'Create Account'
							)}
						</button>
					</form>

					<div className='text-center'>
						<p className='text-base-content/60'>
							Don't have an account?{' '}
							<Link
								to='/signup'
								className='link link-primary'>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* right side */}

			<AuthImage
				title='Join our community'
				subtitle='Connect with friends, share moments, and stay in touch with your loved ones.'
			/>
		</div>
	);
}

export default Login;

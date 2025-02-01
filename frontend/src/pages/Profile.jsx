/** @format */
import React, { useState } from 'react';
import { useStore } from '../store/UserAuthstore';
import { Camera, CircleUser, Mail, User } from 'lucide-react';

function Profile() {
	const { isupdatingprofile, authuser, updateProfile } = useStore();
	const [selectedImg, setSelectedImg] = useState(null);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		const url = URL.createObjectURL(file);
		reader.readAsDataURL(file);

		reader.onload = async () => {
			const base64Image = reader.result;

			setSelectedImg(base64Image);
			await updateProfile({ profilePic: base64Image });
		};
	};

	return (
		<div className='h-screen '>
			<div className='max-w-2xl mx-auto p-4 py-8'>
				<div className='bg-base-300 rounded-xl px-6 pt-1 space-y-8'>
					<div className='text-center'>
						<h1 className='text-2xl font-semibold '>Profile</h1>
						<p className='mt-2'>Your profile information</p>
					</div>

					<div className='flex flex-col items-center gap-3'>
						<div className='relative'>
							<img
								src={authuser.userpic || '/avatar.png'}
								alt='Profile'
								className='size-32 rounded-full object-cover border-4 '
							/>
							{!authuser.userpic && (
								<label
									htmlFor='avatar-upload'
									className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
										isupdatingprofile ? 'animate-pulse pointer-events-none' : ''
									}
                `}>
									<Camera className='w-5 h-5 text-base-200' />
									<input
										type='file'
										id='avatar-upload'
										className='hidden'
										accept='image/*'
										onChange={handleImageUpload}
										disabled={isupdatingprofile}
									/>
								</label>
							)}
						</div>
						<p className='text-sm text-zinc-400'>
							{isupdatingprofile && 'Updating...' ? 'Uploading...' : ''}
						</p>
					</div>

					<div className='space-y-6'>
						<div className='space-y-1.5'>
							<div className='text-sm text-zinc-400 flex items-center gap-2'>
								<User className='w-4 h-4' />
								Full Name
							</div>
							<p className='px-4 py-2.5 bg-base-200 rounded-lg border opacity-40 cursor-not-allowed'>
								{authuser?.username}
							</p>
						</div>

						<div className='space-y-1.5'>
							<div className='text-sm text-zinc-400 flex items-center gap-2'>
								<Mail className='w-4 h-4' />
								Email Address
							</div>
							<p className='px-4 py-2.5 bg-base-200 rounded-lg border opacity-40 cursor-not-allowed'>
								{authuser?.useremail}
							</p>
						</div>
					</div>

					<div className='mt-6 bg-base-300 rounded-xl p-5'>
						<h2 className='text-lg font-medium  mb-4'>Account Information</h2>
						<div className='space-y-3 text-sm'>
							<div className='flex items-center justify-between py-2 border-b border-zinc-700'>
								<span>Member Since</span>
								<span>{authuser.createdAt?.split('T')[0]}</span>
							</div>
							<div className='flex items-center justify-between py-2'>
								<span>Account Status</span>
								<span className='text-green-500'>Active</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;

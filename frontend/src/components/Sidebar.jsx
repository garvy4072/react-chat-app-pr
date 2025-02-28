/** @format */

import React, { useEffect, useMemo, useState } from 'react';
import userChatStore from '../store/UseChat';
import SidebarSKeleton from './Skeleton/SidebarSKeleton';
import { User, Users } from 'lucide-react';
import { useStore } from '../store/UserAuthstore';

function Sidebar() {
	const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
		userChatStore();
	const { onlineUsers } = useStore();
	const filterduser = users.filteruser || [];
	const [onlineuser, setOnlineuser] = useState(false);

	useEffect(() => {
		getUsers();
	}, []);
	let filteronlineuser =
		(onlineuser
			? filterduser.filter((user) => onlineUsers.includes(user._id))
			: users.filteruser) || [];

	if (isUserLoading) {
		return <SidebarSKeleton />;
	}
	return (
		<aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
			<div className='border-b border-base-300 w-full p-5'>
				<div className='flex items-center gap-2'>
					<Users className='size-6' />
					<span className=' font-medium hidden lg:block'>Contacts</span>
				</div>
				<div className='mt-3 hidden lg:flex items-center gap-2'>
					<label className='cursor-pointer flex items-center gap-2'>
						<input
							type='checkbox'
							checked={onlineuser}
							onChange={(e) => setOnlineuser(!onlineuser)}
							className='checkbox checkbox-sm'
						/>
						<span className='text-sm'>Show online only</span>
					</label>
					<span className='text-xs text-zinc-500'>
						({onlineUsers.length - 1} online)
					</span>
				</div>
			</div>
			<div className=' overflow-y-auto w-full py-3'>
				{filteronlineuser.length > 0 ? (
					filteronlineuser.map((user, index) => (
						<button
							key={user._id}
							onClick={() => setSelectedUser(user)}
							className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
								selectedUser?._id === user._id
									? 'bg-base-300 ring-1 ring-base-300'
									: ''
							}
            `}>
							<div className='relative mx-auto lg:mx-0'>
								<img
									src={user.profilePic || './logoo.png'}
									alt={user.fullname}
									className='size-12 object-cover rounded-full'
								/>
								{onlineUsers.includes(user._id) && (
									<span
										className='absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900'
									/>
								)}
							</div>

							<div className='hidden lg:block text-left min-w-0'>
								<div className='font-medium truncate'>{user.fullname}</div>
								<div className='text-sm text-zinc-400'>
									{onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
								</div>
							</div>
						</button>
					))
				) : (
					<div className='text-center text-lg text-zinc-500 py-10'>
						<p>No users found</p>
					</div>
				)}
			</div>
		</aside>
	);
}

export default Sidebar;

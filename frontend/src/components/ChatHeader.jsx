/** @format */

import React from 'react';
import userChatStore from '../store/UseChat';
import { X } from 'lucide-react';
import { useStore } from '../store/UserAuthstore';

function ChatHeader() {
	const { selectedUser, setSelectedUser } = userChatStore();
	const { onlineUsers } = useStore();

	return (
		<div className='p-2.5 border-b border-base-300'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					{/* Avatar */}
					<div className='avatar'>
						<div className='size-10 rounded-full relative'>
							<img
								src={selectedUser.profilePic || '/logoo.png'}
								alt={selectedUser.fullName}
							/>
						</div>
					</div>

					{/* User info */}
					<div>
						<h3 className='font-medium'>{selectedUser.fullname}</h3>
						<p className='text-sm text-base-content/70'>
							{onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
						</p>
					</div>
				</div>

				{/* Close button */}
				<button onClick={() => setSelectedUser(null)}>
					<X />
				</button>
			</div>
		</div>
	);
}

export default ChatHeader;

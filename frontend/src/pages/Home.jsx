/** @format */

import React from 'react';
import userChatStore from '../store/UseChat';
import Sidebar from '../components/Sidebar';
import Nochatselected from '../components/Nochatselected';
import ChatContainer from '../components/ChatContainer';

function Home() {
	const { selectedUser } = userChatStore();
	return (
		<div className='h-screen bg-base-200'>
			<div className='flex justify-center items-center pt-10 px-4'>
				<div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
					<div className='flex h-full rounded-lg overflow-hidden'>
						<Sidebar />
						{!selectedUser ? <Nochatselected /> : <ChatContainer />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

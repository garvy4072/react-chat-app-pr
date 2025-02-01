/** @format */

import React, { useEffect, useRef } from 'react';
import userChatStore from '../store/UseChat';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './Skeleton/MessageSkeleton';
import { useStore } from '../store/UserAuthstore';

function ChatContainer() {
	const {
		messages,
		isMessagesLoading,
		getMessages,
		listienmessages,
		selectedUser,
		unlistenmessages,
	} = userChatStore();
	const { authuser } = useStore();

	const messageendref = useRef(null);
	const message = messages || [];
	useEffect(() => {
		if (selectedUser?._id) {
			getMessages(selectedUser._id);
			listienmessages();
		}
		return () => {
			unlistenmessages();
		};
	}, [selectedUser, getMessages, listienmessages, unlistenmessages]);
	useEffect(() => {
		if (messageendref.current) {
			messageendref.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);
	if (isMessagesLoading) {
		return (
			<div className='flex-1 flex flex-col overflow-auto'>
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);
	}

	return (
		<div className='flex-1 flex flex-col overflow-auto'>
			<ChatHeader />
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{message.map((message, index) => {
					return (
						<div
							ref={messageendref}
							key={index}
							className={`chat ${
								message.senderId === authuser._id ||
								message.senderId === authuser?.userid
									? 'chat-end'
									: 'chat-start'
							}`}>
							<div className=' chat-image avatar'>
								<div className='size-10 rounded-full border'>
									<img
										src={
											message.senderId === authuser._id ||
											message.senderId === authuser?.userid
												? authuser.userpic
												: selectedUser.profilePic
										}
										alt='profile pic'
									/>
								</div>
							</div>
							<div className='chat-header mb-1'>
								<time className='text-xs opacity-50 ml-1'>
									{new Date(message.createdAt).toLocaleTimeString('es', {
										hour: '2-digit',
										minute: '2-digit',
										hour12: false,
									})}
								</time>
							</div>
							<div className='chat-bubble flex float-right flex-col'>
								{message.image && (
									<img
										src={message.image}
										alt='Attachment'
										className='sm:max-w-[200px] rounded-md mb-2'
									/>
								)}
								{message.text && <p>{message.text}</p>}
							</div>
						</div>
					);
				})}
			</div>
			<MessageInput />
		</div>
	);
}

export default ChatContainer;

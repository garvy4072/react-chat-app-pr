/** @format */

import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { useStore } from './UserAuthstore';

const userChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUserLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUserLoading: true });
		try {
			const response = await axiosInstance.get('/message/users');
			set({ users: response.data });
		} catch (error) {
			toast.error('Failed to load users');
			set({ isUserLoading: false });
		} finally {
			set({ isUserLoading: false });
		}
	},

	getMessages: async (user) => {
		set({ isMessagesLoading: true });
		try {
			const res = await axiosInstance.get(`/message/${user}`);
			set({ messages: res.data.messages || [] });
		} catch (error) {
			toast.error('Failed to load messages');
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	setSelectedUser: (user) => {
		set({ selectedUser: user });
	},

	sendmeassge: async (messagedata) => {
		const { selectedUser, messages } = get();
		const currentmessage = Array.isArray(messages) ? messages : [];

		try {
			const ref = await axiosInstance.post(
				`/message/send/${selectedUser._id}`,
				messagedata
			);
			console.log(ref.data);
			set({ messages: [...currentmessage, ref.data.newmessage] });
		} catch (error) {
			console.log(error);
			toast.error('Failed to send message');
		}
	},
	listienmessages: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;

		const socket = useStore.getState().socket;
		if (!socket) {
			console.error('Socket not initialized');
			return;
		}

		socket.off('newmessage');

		socket.on('newmessage', (newMessage) => {
			console.log('New message received:', newMessage);
			if (newMessage.senderId !== selectedUser._id) return;
			set((state) => ({ messages: [...state.messages, newMessage] }));
		});
	},

	unlistenmessages: () => {
		const socket = useStore.getState().socket;
		if (!socket) return;

		console.log('Unlistening from messages...');
		socket.off('newmessage');
	},
}));

export default userChatStore;

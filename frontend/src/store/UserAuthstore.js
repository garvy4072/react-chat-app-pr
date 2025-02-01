/** @format */

import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

export const useStore = create((set, get) => ({
	authuser: null,
	ischeckingAuth: true,
	issignUp: false,
	socket: null,
	isupdatingprofile: false,
	onlineUsers: [],
	isloggingin: false,
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get('/auth/check');
			set({ authuser: res.data });
			get().connectSocket();
		} catch (error) {
			set({ authuser: null });
		} finally {
			set({ ischeckingAuth: false });
		}
	},
	signUp: async (data) => {
		set({ issignUp: true });
		try {
			const res = await axiosInstance.post('/auth/signup', data);

			set({ authuser: res.data });
			toast.success(' Account created successfully');
			get().connectSocket();
		} catch (error) {
			toast.error('Error creating account');
			set({ authuser: null, issignUp: false });
		} finally {
			set({ issignUp: false });
		}
	},
	login: async (data) => {
		try {
			const res = await axiosInstance.post('/auth/login', data);

			toast.success(' Login successful');
			set({ authuser: res.data, isloggingin: true });
			get().connectSocket();
		} catch (error) {
			toast.error(error.message);
			set({ authuser: null, isloggingin: false });
		} finally {
			set({ isloggingin: false });
		}
	},
	logout: async () => {
		try {
			await axiosInstance.post('/auth/logout');
			set({ authuser: null });
			toast.success(' Logged out successfully');
			get().disconnectSocket();
		} catch (err) {
			toast.error('Error logging out');
		} finally {
			set({ authuser: null });
		}
	},
	updateProfile: async (data) => {
		set({ isupdatingprofile: true });
		try {
			const res = await axiosInstance.put('/auth/updateprofile', data);
			console.log(res);
			set({ authuser: res.data, isupdatingprofile: false });
			toast.success(' Profile updated successfully');
		} catch (error) {
			toast.error('Error in updating profile');
			console.log(error);
			set({ isupdatingprofile: false });
		} finally {
			set({ isupdatingprofile: false });
		}
	},
	connectSocket: () => {
		const { authuser } = get();
		if (!authuser || get().socket?.connected) return;

		const socket = io('https://react-chat-app-pr.onrender.com', {
			query: {
				userid: authuser?._id || authuser?.userid,
			},
		});

		socket.connect();
		set({ socket: socket });

		socket.on('getOnlineUsers', (users) => {
			console.log('Online users received:', users); // Debugging Log
			if (Array.isArray(users)) {
				set({ onlineUsers: users }); // Ensure it's an array
			}
		});
	},

	disconnectSocket: () => {
		if (get().socket?.connected) get().socket.disconnect();
	},
}));

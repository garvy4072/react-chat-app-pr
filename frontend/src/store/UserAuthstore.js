/** @format */

import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useStore = create((set) => ({
	authuser: null,
	ischeckingAuth: true,
	issignUp: false,
	isupdatingprofile: false,
	isloggingin: false,
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get('/auth/check');
			console.log(res);
			set({ authuser: res.data });
		} catch (error) {
			console.log(error);
			set({ authuser: null });
		} finally {
			set({ ischeckingAuth: false });
		}
	},
	signUp: async (data) => {
		try {
			const res = await axiosInstance.post('/auth/signup', data);
			console.log(res);
			set({ authuser: res.data, issignUp: true });
		} catch (error) {
			console.log(error);
			set({ authuser: null, issignUp: false });
		} finally {
			set({ issignUp: false });
		}
	},
}));

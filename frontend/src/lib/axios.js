/** @format */

import axios from 'axios';
export const axiosInstance = axios.create({
	baseURL: 'https://react-chat-app-pr.onrender.com/api',
	withCredentials: true,
});
// https://react-chat-app-pr.onrender.com/api
// http://localhost:3000/api

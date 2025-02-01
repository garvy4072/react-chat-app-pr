/** @format */

import axios from 'axios';
export const axiosInstance = axios.create({
	baseURL: 'https://react-chat-app-pr.onrender.com',
	withCredentials: true,
});
// http://localhost:3000/api

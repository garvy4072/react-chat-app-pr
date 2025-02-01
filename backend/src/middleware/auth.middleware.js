/** @format */

import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import dotenv from 'dotenv';
dotenv.config({
	path: './.env',
});
export const protectroute = async (req, res, next) => {
	console.log('Cookies received:', req.cookies);
	console.log('Authorization Header:', req.headers.authorization);

	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized hai' });
	}

	try {
		const decode = jwt.verify(token, process.env.JWTOKEN);
		console.log('Decoded Token:', decode);
		const user = await User.findById(decode.userid).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log('JWT Verification Error:', error);
		return res.status(401).json({ message: 'Invalid Token' });
	}
};

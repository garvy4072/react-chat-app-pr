/** @format */

import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import dotenv from 'dotenv';
dotenv.config({
	path: './.env',
});
export const protectroute = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		console.log(token);
		if (!token) {
			return res.json({ message: 'Unauthorized hai' });
		}

		const decode = jwt.verify(token, process.env.JWTOKEN, {
			ignoreExpiration: true,
		});
		const user = await User.findOne({ _id: decode.userid }).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

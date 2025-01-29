/** @format */

import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';

export const protectroute = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
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
export const updateProfile = async (req, res) => {};

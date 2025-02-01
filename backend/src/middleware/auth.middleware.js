/** @format */

import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import dotenv from 'dotenv';
dotenv.config({
	path: './.env',
});
export const protectroute = async (req, res, next) => {
	try {
		// Check for the token in cookies
		const token = req.cookies.token;

		// If no token is found, respond with Unauthorized
		if (!token) {
			return res
				.status(401)
				.json({ message: 'Unauthorized: No token provided' });
		}

		// Decode the token using the secret key (no ignoreExpiration to check if token is expired)
		let decode;
		try {
			decode = jwt.verify(token, process.env.JWTOKEN);
		} catch (err) {
			// Token expired or invalid
			if (err.name === 'TokenExpiredError') {
				return res.status(401).json({ message: 'Token has expired' });
			}
			// Invalid token error
			return res.status(401).json({ message: 'Invalid token' });
		}

		// Find the user associated with the decoded token
		const user = await User.findOne({ _id: decode.userid }).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized: User not found' });
		}

		// Attach the user to the request object for further use
		req.user = user;
		next();
	} catch (error) {
		// General server error handling
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

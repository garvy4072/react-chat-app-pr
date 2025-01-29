/** @format */

import jsonwebtoken from 'jsonwebtoken';

const generatetoken = (userid, res) => {
	const token = jsonwebtoken.sign({ userid }, process.env.JWTOKEN, {
		expiresIn: '7d',
	});
	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 604800000,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
	return token;
};
export default generatetoken;

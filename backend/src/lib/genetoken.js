/** @format */

import jsonwebtoken from 'jsonwebtoken';

const generatetoken = (userid, res) => {
	const token = jsonwebtoken.sign({ userid }, process.env.JWTOKEN, {
		expiresIn: '7d',
	});
	console.log(process.env.JWTOKEN);
	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 604800000,
		sameSite: 'None',
		secure: true,
	});
	return token;
};
export default generatetoken;

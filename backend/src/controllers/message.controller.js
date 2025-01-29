/** @format */

import User from '../models/users.model.js';

export const getuserforsidbar = async (req, res) => {
	try {
		const logginUserId = req.user._id;
		const filteruser = await User.find({ _id: { $ne: logginUserId } }).select(
			'-password'
		);
		return res.status(200).json({
			status: 'success',
			filteruser,
		});
	} catch (error) {
		console.log(`error in getuserforsidbar ${error}`);
		return res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
		});
	}
};

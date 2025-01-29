/** @format */

import Message from '../models/message.model.js';
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

export const getmessage = async (req, res) => {
	try {
		const { id } = req.params;
		const senderId = req.user._id;
		const message = await Message.find({
			$or: [
				{ senderId: senderId },
				{ receiverId: id },
				{
					senderId: id,
					receiverId: senderId,
				},
			],
		});
		res.status(200).json({
			status: 'success',
			message,
		});
	} catch (err) {
		console.log(`error in getmessage ${err}`);
	}
};

export const sendmessage = async (req, res) => {
	try {
		const { id } = req.params;
		const { text, image } = req.body;
		const senderId = req.user._id;
		let url;
		if (image) {
			url = await uploadimage(image);
		}
		const newmessage = new Message({
			senderId: senderId,
			receiverId: id,
			text: text,
			image: url,
		});
		await newmessage.save();

		res.status(201).json({
			status: 'success',
			message: 'message sent successfully',
		});
	} catch (error) {
		console.log(`error in sendmessage ${error}`);
	}
};

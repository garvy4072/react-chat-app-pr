/** @format */

import { getRecieverId, io } from '../lib/socket.js';
import upload from '../middleware/Cloudinary.js';
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
		const { id } = req.params; // Receiver ID from request params
		const senderId = req.user._id; // Sender ID from authenticated user

		const messages = await Message.find({
			$or: [
				{ senderId: senderId, receiverId: id }, // Messages sent by user
				{ senderId: id, receiverId: senderId }, // Messages received by user
			],
		}).sort({ createdAt: 1 }); // Sort messages by time (oldest to newest)

		res.status(200).json({
			messages,
		});
	} catch (err) {
		console.error(`Error in getmessage: ${err}`);
		res
			.status(500)
			.json({ status: 'error', message: 'Failed to fetch messages' });
	}
};

export const sendmessage = async (req, res) => {
	try {
		const { id } = req.params;
		const { text, image } = req.body;

		const senderId = req.user._id;
		let url;
		if (image) {
			url = await upload(image);
		}

		const newmessage = new Message({
			senderId: senderId,
			receiverId: id,
			text: text,
			image: url,
		});
		await newmessage.save();
		const recieversocketid = getRecieverId(id);
		if (recieversocketid) {
			io.to(recieversocketid).emit('newmessage', newmessage);
		}

		res.status(201).json({
			newmessage,
		});
	} catch (error) {
		console.log(`error in sendmessage ${error}`);
	}
};

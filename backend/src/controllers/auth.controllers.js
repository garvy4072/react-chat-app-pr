/** @format */
import bcryptjs from 'bcryptjs';
import User from '../models/users.model.js';
import generatetoken from '../lib/genetoken.js';
import upload from '../middleware/Cloudinary.js';
export const signup = async (req, res) => {
	try {
		const { email, fullname, password } = req.body;
		console.log(email, fullname, password);
		if (!fullname || !email || !password) {
			return res.status(400).json({ message: 'Please fill in all fields' });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: 'Password must be at least 8 characters long' });
		}
		const salt = await bcryptjs.genSalt(10);

		const hash = await bcryptjs.hash(password, salt);
		const finduser = await User.findOne({ email });

		if (finduser) {
			return res.status(400).json({ message: 'Email already exists' });
		}
		const newuser = new User({
			email: email,
			fullname: fullname,
			password: hash,
		});
		if (newuser) {
			generatetoken(newuser._id, res);
			const saveuser = await newuser.save();
			return res.status(201).json({
				message: 'User created successfully',
				userid: saveuser._id,
				useremail: saveuser.email,
				userpic: saveuser.profilePic,
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'Invalid request' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Please fill in all fields' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		const matchpass = await bcryptjs.compare(password, user.password);
		if (!matchpass) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		generatetoken(user._id, res);
		return res.status(201).json({
			message: 'User created successfully',
			userid: user._id,
			useremail: user.email,
			userpic: user.profilePic,
		});
	} catch (err) {
		return res.status(400).json({ message: 'Invalid request' });
	}
};
export const logout = (req, res) => {
	try {
		res.cookie('token', '', { maxAge: 0 });
		return res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Invalid request' });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const image = req.file;
		const path = image.path;
		const userid = req.user._id;
		if (!profilePic) {
			return res.status(400).json({ message: 'Please fill in all fields' });
		}
		const upload = upload(profilePic);
		const updateuser = await User.findByIdAndUpdate(
			userid,
			{ profilePic: upload },
			{ new: true }
		);
		return res.status(201).json({
			message: 'Profile updated successfully',
			userid: updateuser._id,
			useremail: updateuser.email,
			userpic: updateuser.profilePic,
		});
	} catch (err) {
		console.log(err);
	}
};
export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		return res.status(200).json({
			message: 'User authenticated',
			userid: user._id,
			useremail: user.email,
			userpic: user.profilePic,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Invalid request' });
	}
};

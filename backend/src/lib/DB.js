/** @format */
import mongoose from 'mongoose';
const connection = async () => {
	try {
		const dd = await mongoose.connect(process.env.CONNECTIONURL);
		console.log(`Connected to MongoDB ${dd.connection.host}`);
	} catch (err) {}
};

export default connection; // eslint-disable-line

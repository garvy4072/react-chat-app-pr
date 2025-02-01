/** @format */
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
const connection = async () => {
	try {
		const dd = await mongoose.connect(process.env.CONNECTIONURL);
		return dd.connection.host;
	} catch (err) {}
};

export default connection; // eslint-disable-line

/** @format */

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
	cloud_name: process.env.CNAME,
	api_key: process.env.CAPIKEY,
	api_secret: process.env.CSECRET,
});
const upload = async (path) => {
	try {
		const result = await cloudinary.uploader.upload(path);
		return result.secure_url;
	} catch (error) {
		return error.message;
	}
};
export default upload;

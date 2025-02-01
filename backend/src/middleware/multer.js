/** @format */

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, './upload'));
	},
	filename: (req, file, cb) => {
		console.log(file);
		const ext = path.extname(file.originalname);
		const filename = file.originalname.replace(ext, '');
		cb(null, `${filename}${Date.now()}${ext}`);
	},
});
const uploader = multer({ storage: storage });
export default uploader;

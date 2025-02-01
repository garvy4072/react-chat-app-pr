/** @format */

import e from 'express';
import { protectroute } from '../middleware/auth.middleware.js';
import {
	getuserforsidbar,
	getmessage,
	sendmessage,
} from '../controllers/message.controller.js';
import uploader from '../middleware/multer.js';

const router = e.Router();
router.get('/users', protectroute, getuserforsidbar);
router.get('/:id', protectroute, getmessage);
router.post('/send/:id', uploader.single('image'), protectroute, sendmessage);
export default router;

/** @format */

import e from 'express';
import { protectroute } from '../middleware/auth.middleware.js';
import { getuserforsidbar } from '../controllers/message.controller.js';

const router = e.Router();
router.get('/users', protectroute, getuserforsidbar);
export default router;

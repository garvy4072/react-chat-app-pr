/** @format */

import e from 'express';
import {
	login,
	logout,
	signup,
	updateProfile,
	checkAuth,
} from '../controllers/auth.controllers.js';
import { protectroute } from '../middleware/auth.middleware.js';

const route = e.Router();
route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logout);

route.put('/updateprofile', protectroute, updateProfile);
route.get('/check', protectroute, checkAuth);
export default route;

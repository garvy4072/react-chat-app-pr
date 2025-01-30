/** @format */

import express from 'express';
import authRoute from './routes/auth.routes.js';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
import connection from './lib/DB.js';
import messageroute from './routes/message.route.js';
import cors from 'cors';
dotenv.config({
	path: './.env',
});
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(cookieparser());
connection().then((res) => console.log('connected'));
const port = process.env.PORT;
app.use('/api/auth', authRoute);
app.use('/api/message', messageroute);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

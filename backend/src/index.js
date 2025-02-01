/** @format */

import express from 'express';
import authRoute from './routes/auth.routes.js';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
import connection from './lib/DB.js';
import bodyParser from 'body-parser';
import messageroute from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';
dotenv.config({
	path: './.env',
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Cache-Control',
			'Access-Control-Allow-Origin',
			'Expires',
			'pragma',
		],
	})
);
app.options('*', cors());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
connection().then((res) => console.log('connected', res.connection.host));
const port = process.env.PORT;

app.use('/api/auth', authRoute);
app.use('/api/message', messageroute);
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

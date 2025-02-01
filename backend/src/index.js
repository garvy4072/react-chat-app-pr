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
const allowedOrigins = [''];
app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});
app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

// app.options('*', cors());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
connection().then((res) => console.log('connected', res));
const port = process.env.PORT;

app.use('/api/auth', authRoute);
app.use('/api/message', messageroute);
server.listen(port, () => {
	console.log(
		`Server is running on port ${port} , ${process.env.CONNECTIONURL}`
	);
});

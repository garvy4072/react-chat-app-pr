/** @format */

import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:5173'], // Allow local frontend
		methods: ['GET', 'POST'],
		credentials: true, // Allow cookies & authentication headers
	},
});

const userSocketMap = {};

export function getRecieverId(userid) {
	console.log(userid);
	return userSocketMap[userid];
}

io.on('connection', (socket) => {
	console.log('A user connected:', socket.id);

	const userId = socket.handshake.query.userid;
	if (userId) {
		userSocketMap[userId] = socket.id;
	}

	io.emit('getOnlineUsers', Object.keys(userSocketMap));

	socket.on('disconnect', () => {
		console.log(`User ${userId} disconnected`, socket.id);

		if (userId) {
			delete userSocketMap[userId];
		}

		io.emit('getOnlineUsers', Object.keys(userSocketMap));
	});
});

export { io, app, server };

/** @format */

import React, { useRef, useState } from 'react';
import userChatStore from '../store/UseChat';
import { Image, Send, X } from 'lucide-react';

function MessageInput() {
	const [message, setMessage] = useState('');
	const [imagepreview, setImagePreview] = useState(null);
	const fileinputref = useRef(null);
	const [sending, setSending] = useState(false);
	const { sendmeassge } = userChatStore();
	const reset = () => {
		setMessage('');
		setImagePreview(null);
	};
	const handleSendMessage = async (e) => {
		e.preventDefault();

		if (!message.trim() && !imagepreview) {
			return;
		}

		try {
			setSending(true);
			const rr = await sendmeassge({
				text: message.trim(),
				image: imagepreview,
			});

			reset();
			setSending(false);
		} catch (error) {
			console.error(`Error in input: ${error}`);
			setSending(false);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);

			reader.onload = async () => {
				const base64Image = reader.result;
				setImagePreview(base64Image);
				console.log(imagepreview);
			};
		}
	};
	const removeImage = () => {
		setImagePreview(null);
		if (fileinputref.current) {
			fileinputref.current.value = '';
		}
	};
	return (
		<div className='p-2 w-full'>
			{imagepreview && (
				<div className='md-3 flex items-center gap-2'>
					<div className='relative'>
						<img
							src={imagepreview}
							alt='image'
							className='w-20 h-20
                    object-cover rounded-lg
                     border border-zinc-700'
						/>
						<button
							onClick={removeImage}
							className='absolute top-1 right-1 bg-red-500 p-1 rounded-full hover
                        '>
							<X className=' size-3' />
						</button>
					</div>
				</div>
			)}
			<form
				onSubmit={handleSendMessage}
				className='flex items-center gap-2'>
				<div className='flex-1 flex gap-2'>
					<input
						type='text'
						className='w-full input input-bordered rounded-lg input-sm sm:input-md'
						placeholder='Type a message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<input
						type='file'
						multiple
						name='image'
						accept='image/*'
						className='hidden'
						ref={fileinputref}
						onChange={handleImageChange}
						id=''
					/>
					<button
						className={`hidden sm:flex btn btn-circle ${
							imagepreview ? 'text-emerald-700' : 'text-gray-500'
						}`}
						onClick={(e) => {
							e.preventDefault();
							fileinputref.current?.click();
						}}>
						<Image size={20} />
					</button>
				</div>
				<button
					type='submit'
					className='btn btn-sm btn-circle'
					disabled={!message.trim() && !imagepreview && sending}>
					<Send size={22} />
				</button>
			</form>
		</div>
	);
}

export default MessageInput;

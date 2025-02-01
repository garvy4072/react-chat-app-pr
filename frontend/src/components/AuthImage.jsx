/** @format */

import React, { useEffect, useState } from 'react';

function AuthImage({ title, subtitle }) {
	const [num, setnum] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			const randomno = Math.floor(Math.random() * 10);

			setnum(randomno);
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className='hidden lg:flex items-center justify-center bg-base-200 p-12'>
			<div className='max-w-md text-center'>
				<div className='grid grid-cols-3 gap-3 mb-8'>
					{[...Array(9)].map((_, i) => (
						<div
							key={i}
							className={`aspect-square rounded-2xl bg-primary/10 ${
								i % num === 0 ? 'animate-pulse bg-primary/30' : ''
							}`}
						/>
					))}
				</div>
				<h2 className='text-2xl font-bold mb-4'>{title}</h2>
				<p className='text-base-content/60'>{subtitle}</p>
			</div>
		</div>
	);
}

export default AuthImage;

/** @format */

import useSound from 'use-sound';
// import sound from '../lib/sound.mp3';
import { useEffect } from 'react';
function Navbar() {
	const pl = () => {
		console.log('pl');
	};

	useEffect(() => {
		const handleScroll = () => {
			console.log('Scroll is at 100');
			if (window.scrollY === 300) {
				// Runs only when scrollY is exactly 100
				pl();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll); // Cleanup function
		};
	}, []);
	return (
		<div>
			<button
				onClick={() => {
					// play();
				}}
				className='btn'>
				btn
			</button>
		</div>
	);
}

export default Navbar;

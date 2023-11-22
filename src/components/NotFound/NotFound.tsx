import meme from '../../assets/images/peaceout-vanish.gif';
import React from 'react';

import './NotFound.scss';

export const NotFound: React.FC = () => {
	return (
		<div className='not-found'>
			<img
				src={meme}
				alt=''
				height={100}
				width={150}
				className='not-found--image'
			/>

			<span className='not-found--text'>
				It seems your city no longer exists.
			</span>
			<span className='not-found--text-small'>
				Or you just typed it wrong. Try again.
			</span>
		</div>
	);
};

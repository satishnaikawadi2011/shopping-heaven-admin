import { Typography } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../data/no-data.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface NoDataProps {
	height?: number;
	width?: number;
	message: string;
}

const NoData: React.FC<NoDataProps> = ({ message, height = 500, width = 500 }) => {
	return (
		<div>
			<Lottie options={defaultOptions} height={height} width={width} />;
			<Typography variant="h3" style={{ textAlign: 'center' }}>
				{message}
			</Typography>
		</div>
	);
};

export default NoData;

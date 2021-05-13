import { Typography } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../data/error.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface ErrorProps {
	height?: number;
	width?: number;
}

const ErrorPage: React.FC<ErrorProps> = ({ height = 300, width = 300 }) => {
	return (
		<div>
			<Lottie options={defaultOptions} height={height} width={width} />;
			<Typography variant="h3" style={{ textAlign: 'center', color: '#EE7851' }}>
				Something went wrong , please try again.
			</Typography>
		</div>
	);
};

export default ErrorPage;

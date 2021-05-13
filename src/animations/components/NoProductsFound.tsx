import { Typography } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../data/empty-box.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface NoProductsProps {
	height?: number;
	width?: number;
}

const NoProductsFound: React.FC<NoProductsProps> = ({ height = 300, width = 300 }) => {
	return (
		<div>
			<Lottie options={defaultOptions} height={height} width={width} />;
			<Typography variant="h3" style={{ textAlign: 'center' }}>
				No products available. Add some products.
			</Typography>
		</div>
	);
};

export default NoProductsFound;

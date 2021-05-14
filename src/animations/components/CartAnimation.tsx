import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../data/cart.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface CartProps {
	height?: number;
	width?: number;
}

const CartAnimation: React.FC<CartProps> = ({ height = 500, width = 500 }) => {
	return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default CartAnimation;

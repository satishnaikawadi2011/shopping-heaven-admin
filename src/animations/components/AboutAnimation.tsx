import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../data/about.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData
};

interface AboutProps {
	height?: number;
	width?: number;
}

const AboutAnimation: React.FC<AboutProps> = ({ height = 300, width = 300 }) => {
	return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default AboutAnimation;

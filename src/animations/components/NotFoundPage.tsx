import { Typography } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import LayoutWrapper from '../../components/layout/LayoutWrapper';

import animationData from '../data/404.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface NotFoundPageProps {
	height?: number;
	width?: number;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ height = 500, width = 500 }) => {
	return (
		<LayoutWrapper noDrawer noMenu>
			<div>
				<Lottie options={defaultOptions} height={height} width={width} />;
				<Typography variant="h3" style={{ textAlign: 'center' }}>
					Oops , Page not found !!!
				</Typography>
			</div>
		</LayoutWrapper>
	);
};

export default NotFoundPage;

import React from 'react';

const Centre: React.FC<{}> = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '90vh',
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex'
			}}
		>
			{children}
		</div>
	);
};

export default Centre;

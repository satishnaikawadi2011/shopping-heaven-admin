import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

interface ErrorMessageProps {
	errorMessage: string;
	style?: React.CSSProperties | undefined;
	visible: boolean;
}

const AppErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage, visible, style }) => {
	if (!visible) {
		return null;
	}
	return (
		<FormHelperText error style={style}>
			{errorMessage}
		</FormHelperText>
	);
};

export default AppErrorMessage;

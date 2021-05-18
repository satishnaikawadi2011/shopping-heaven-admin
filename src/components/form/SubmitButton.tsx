import Button from '@material-ui/core/Button';
import { useFormikContext } from 'formik';
import React from 'react';

interface SubmitButtonProps {
	title: string;
	loading?: boolean;
	disabled?: boolean;
	style?: React.CSSProperties | undefined;
	variant?: 'text' | 'outlined' | 'contained' | undefined;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ variant, style, title, loading, disabled }) => {
	const { handleSubmit } = useFormikContext();
	return (
		<Button
			style={style}
			color="primary"
			variant={variant}
			disabled={disabled || loading}
			onClick={handleSubmit as any}
		>
			{title}
		</Button>
	);
};

export default SubmitButton;

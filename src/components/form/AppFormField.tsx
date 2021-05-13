import { useFormikContext } from 'formik';
import React from 'react';
import AppErrorMessage from './AppErrorMessage';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((props) => ({
	fieldContainer:
		{
			marginBottom: 15
		},
	field:
		{
			width: '100vw',
			maxWidth: 600
		}
}));
interface FormFieldProps {
	fieldName: string;
}

const AppFormField: React.FC<FormFieldProps & TextFieldProps> = ({ className, fieldName, ...props }) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;
	const classes = useStyles();
	return (
		<div className={classes.fieldContainer}>
			<TextField
				onChange={(e) => setFieldValue(fieldName, e.target.value)}
				value={myValues[fieldName]}
				onBlur={() => setFieldTouched(fieldName)}
				className={`${classes.field} ${className}`}
				{...props}
			/>
			<AppErrorMessage errorMessage={formErrors[fieldName]} visible={formTouched[fieldName]} />
		</div>
	);
};

export default AppFormField;

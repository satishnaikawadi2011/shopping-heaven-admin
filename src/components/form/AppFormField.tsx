import { useFormikContext } from 'formik';
import React from 'react';
import AppErrorMessage from './AppErrorMessage';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface FormFieldProps {
	fieldName: string;
}

const AppFormField: React.FC<FormFieldProps & TextFieldProps> = ({ fieldName, ...props }) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;
	return (
		<div>
			<TextField
				onChange={(e) => setFieldValue(fieldName, e.target.value)}
				value={myValues[fieldName]}
				onBlur={() => setFieldTouched(fieldName)}
				{...props}
			/>
			<AppErrorMessage errorMessage={formErrors[fieldName]} visible={formTouched[fieldName]} />
		</div>
	);
};

export default AppFormField;

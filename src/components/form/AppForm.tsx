import { Formik } from 'formik';
import React from 'react';

interface AppFormProps {
	initialValues: any;
	validationSchema: any;
	onSubmit: any;
}

const AppForm: React.FC<AppFormProps> = ({ initialValues, onSubmit, validationSchema, children }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{() => <React.Fragment>{children}</React.Fragment>}
		</Formik>
	);
};

export default AppForm;

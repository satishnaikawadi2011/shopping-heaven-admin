import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
	container:
		{
			display: 'flex',
			justifyContent: 'center',
			width: '100%'
		}
}));

interface FormConProps {}

const FormContainer: React.FC<FormConProps> = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.container}>{children}</div>;
};

export default FormContainer;

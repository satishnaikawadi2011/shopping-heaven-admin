import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
const AppAlert = (props: AlertProps) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default AppAlert;

import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import { Color } from '@material-ui/lab/Alert';
import React from 'react';
import AppAlert from './AppAlert';

interface AppSnackProps {
	handleSnackbarClose: ((event: React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void) | undefined;
	open: boolean;
	autoHideDuration?: number | null | undefined;
	message: string;
	severity?: Color | undefined;
}

const AppSnackbar: React.FC<AppSnackProps> = ({
	handleSnackbarClose,
	open,
	autoHideDuration = 6000,
	severity = 'success',
	message
}) => {
	return (
		<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleSnackbarClose}>
			<AppAlert onClose={handleSnackbarClose as any} severity={severity}>
				{message}
			</AppAlert>
		</Snackbar>
	);
};

export default AppSnackbar;

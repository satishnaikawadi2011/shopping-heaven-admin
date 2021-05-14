import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface AppAlertDialogProps {
	open: boolean;
	handleClose: () => void;
	title: string;
	description: string;
	onCancel?: () => void;
	onAgree: () => void;
	cancelLabel?: string;
	agreeLabel?: string;
}

const AppAlertDialog: React.FC<AppAlertDialogProps> = ({
	open,
	handleClose,
	title,
	description,
	onCancel,
	onAgree,
	cancelLabel = 'No',
	agreeLabel = 'Yes'
}) => {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{description}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={

								onCancel ? onCancel :
								handleClose
						}
						color="primary"
					>
						{cancelLabel}
					</Button>
					<Button onClick={onAgree} color="primary" autoFocus>
						{agreeLabel}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AppAlertDialog;

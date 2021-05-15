import React, { useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';

import { User } from '../../models/User';
import { useUserStore } from '../../store/users';
import usersApi from '../../api/users'
import { AUTH_TOKEN_FOR_DEVELOPMENT } from '../../constants';
import AppAlertDialog from '../AppAlertDialog';

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head:
			{
				backgroundColor: theme.palette.common.black,
				color: theme.palette.common.white
			},
		body:
			{
				fontSize: 14
			}
	})
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root:
			{
				'&:nth-of-type(odd)':
					{
						backgroundColor: theme.palette.action.hover
					}
			}
	})
)(TableRow);

const useStyles = makeStyles({
	table:
		{
			minWidth: 700
		}
});

interface CustomerTableProps {
	customers: User[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
	const classes = useStyles();
	const { removeUser, toggleAsAdmin } = useUserStore();
	const [isDeleting, setIsDeleting] = useState(false);
	const [
		user,
		setUser
	] = useState<User>();
	const [
		openAlert,
		setOpenAlert
	] = useState(false);
	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const handleDelete = () => {
		removeUser(user!._id)
		usersApi.deleteUser(AUTH_TOKEN_FOR_DEVELOPMENT, user!._id);
		handleCloseAlert();
	};
	const handleToggleIsAdmin = () => {
			toggleAsAdmin(user!._id ,!user?.isAdmin)
		usersApi.toggleAdminPrevillages(AUTH_TOKEN_FOR_DEVELOPMENT,user!.username,!user!.isAdmin );
		handleCloseAlert();
	};
	const getTitleAndDescOfAlert = () => {
		if (isDeleting) {
			return ['Are you sure you want to remove this user from this app ?','Delete User']
		} else {
			if (user?.isAdmin) {
				return ['Are you sure you want to take back admin previleges from this user ?','Admin Previleges']
			} else {
				return ['Are you sure you want to give admin previleges to this user ?','Admin Previleges']
			}
		}
		}
	return (
		<React.Fragment>
			<AppAlertDialog
				description={getTitleAndDescOfAlert()[0]}
				handleClose={handleCloseAlert}
				open={openAlert}
				title={getTitleAndDescOfAlert()[1]}
				onAgree={isDeleting ? handleDelete:handleToggleIsAdmin}
			/>
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>ID</StyledTableCell>
						<StyledTableCell align="right">Username</StyledTableCell>
						<StyledTableCell align="right">Email</StyledTableCell>
						<StyledTableCell align="right">Admin</StyledTableCell>
						<StyledTableCell align="center">Actions</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{customers.map((customer) => (
						<StyledTableRow key={customer._id}>
							<StyledTableCell component="th" scope="row">
								{customer._id}
							</StyledTableCell>
							<StyledTableCell align="right">{customer.username}</StyledTableCell>
							<StyledTableCell align="right">{customer.email}</StyledTableCell>
							<StyledTableCell align="right">
								{
									customer.isAdmin ? <Tooltip title="Admin User">
										<CheckCircleIcon style={{ color: 'green' }} />
									</Tooltip> :
									<Tooltip title="Regular User">
										<CancelIcon style={{ color: 'red' }} />
									</Tooltip>}
							</StyledTableCell>

							<StyledTableCell align="center">
								<Tooltip
									title={

											customer.isAdmin ? 'Remove Admin Previlliges' :
											'Make Admin'
									}
								>
									<IconButton aria-label="edit" onClick={() => {
										setIsDeleting(false);
										setUser(customer)
										setOpenAlert(true)
									}}>
										<EditIcon style={{ color: 'blue' }} />
									</IconButton>
								</Tooltip>
								<Tooltip title="Delete" onClick={() => {
										setIsDeleting(true);
										setUser(customer)
										setOpenAlert(true)
									}}>
									<IconButton aria-label="delete">
										<DeleteIcon style={{ color: 'red' }} />
									</IconButton>
								</Tooltip>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
		</React.Fragment>
	);
};

export default CustomerTable;

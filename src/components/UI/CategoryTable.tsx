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
import { IconButton } from '@material-ui/core';
import { Category } from '../../models/Category';
import AppAlertDialog from '../AppAlertDialog';
import { useCategoryStore } from '../../store/categories';
import categoriesApi from '../../api/categories';
import { useAuthStore } from '../../store/auth';

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

interface CategoryTableProps {
	categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories }) => {
	const { removeCategory } = useCategoryStore();
	const { token } = useAuthStore();
	const [
		categoryId,
		setCategoryId
	] = useState('');
	const [
		openAlert,
		setOpenAlert
	] = useState(false);
	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const handleDelete = () => {
		removeCategory(categoryId);
		categoriesApi.deleteCategory(token, categoryId);
		handleCloseAlert();
	};
	const classes = useStyles();
	return (
		<React.Fragment>
			<AppAlertDialog
				description="Are you sure you want to delete this product category?"
				handleClose={handleCloseAlert}
				open={openAlert}
				title={'Delete category'}
				onAgree={handleDelete}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell align="right">Name</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories.map((category) => (
							<StyledTableRow key={category._id}>
								<StyledTableCell component="th" scope="row">
									{category._id}
								</StyledTableCell>
								<StyledTableCell align="right">{category.name}</StyledTableCell>
								<StyledTableCell align="center">
									<Tooltip title="Delete">
										<IconButton
											aria-label="delete"
											onClick={() => {
												setOpenAlert(true);
												setCategoryId(category._id);
											}}
										>
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

export default CategoryTable;

import React from 'react';
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
	const classes = useStyles();
	return (
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
	);
};

export default CategoryTable;

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
import EditIcon from '@material-ui/icons/Edit';

import { Product } from '../../models/Product';
import { IconButton } from '@material-ui/core';
import { INDIAN_RUPEE_SIGN } from '../../constants';

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

interface ProductTableProps {
	products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
	const classes = useStyles();
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>ID</StyledTableCell>
						<StyledTableCell align="right">Title</StyledTableCell>
						<StyledTableCell align="right">Price ({INDIAN_RUPEE_SIGN})</StyledTableCell>
						<StyledTableCell align="right">Category</StyledTableCell>
						<StyledTableCell align="center">Actions</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.map((product) => (
						<StyledTableRow key={product._id}>
							<StyledTableCell component="th" scope="row">
								{product._id}
							</StyledTableCell>
							<StyledTableCell align="right">{product.title}</StyledTableCell>
							<StyledTableCell align="right">{product.price}</StyledTableCell>
							<StyledTableCell align="right">{''}</StyledTableCell>

							<StyledTableCell align="center">
								<Tooltip title="Edit">
									<IconButton aria-label="edit">
										<EditIcon style={{ color: 'blue' }} />
									</IconButton>
								</Tooltip>
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

export default ProductTable;

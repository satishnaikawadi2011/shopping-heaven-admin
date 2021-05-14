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
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';

import { Product } from '../../models/Product';
import { AUTH_TOKEN_FOR_DEVELOPMENT, INDIAN_RUPEE_SIGN } from '../../constants';
import productsApi from '../../api/products';
import { useProductStore } from '../../store/products';
import { Category } from '../../models/Category';
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

interface ProductTableProps {
	products: Product[];
	categories: Category[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products, categories }) => {
	const history = useHistory();
	const classes = useStyles();
	const [
		productId,
		setProductId
	] = useState('');
	const [
		openAlert,
		setOpenAlert
	] = useState(false);
	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const { removeProduct } = useProductStore();
	const handleEdit = (id: string) => {
		history.push(`/products/${id}`);
	};
	const handleDelete = () => {
		removeProduct(productId);
		productsApi.deleteProduct(AUTH_TOKEN_FOR_DEVELOPMENT, productId);
		handleCloseAlert();
	};
	const getCategoryName = (id: string): string => {
		console.log('In table', categories);
		const category = categories.find((cat) => cat._id === id);
		return category!.name;
	};
	return (
		<React.Fragment>
			<AppAlertDialog
				description="Are you sure you want to delete this product ?"
				handleClose={handleCloseAlert}
				open={openAlert}
				title={'Delete Product'}
				onAgree={handleDelete}
			/>
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
								<StyledTableCell align="right">{getCategoryName(product.categoryId!)}</StyledTableCell>

								<StyledTableCell align="center">
									<Tooltip title="Edit">
										<IconButton aria-label="edit" onClick={() => handleEdit(product._id)}>
											<EditIcon style={{ color: 'blue' }} />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete">
										<IconButton
											aria-label="delete"
											onClick={() => {
												setOpenAlert(true);
												setProductId(product._id);
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

export default ProductTable;

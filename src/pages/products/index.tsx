import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import useApi from '../../hooks/useApi';
import productsApi from '../../api/products';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		},
	addBtn: {},
	addBtnContainer: { display: 'flex', justifyContent: 'flex-end' }
}));

const Index = () => {
	const { data, error, loading, request: getProducts } = useApi(productsApi.getProducts);
	const classes = useStyles();
	return (
		<div>
			<Typography className={classes.title} variant="h3" component="h1">
				Manage Products
			</Typography>
			<div className={classes.addBtnContainer}>
				<Button variant="contained" className={classes.addBtn} startIcon={<AddIcon />}>
					Add Product
				</Button>
			</div>
		</div>
	);
};

export default Index;

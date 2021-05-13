import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import useApi from '../../hooks/useApi';
import productsApi from '../../api/products';
import ErrorPage from '../../animations/components/ErrorPage';
import AppLoader from '../../animations/components/AppLoader';
import { useProductStore } from '../../store/products';
import ProductTable from '../../components/UI/ProductTable';
import Centre from '../../components/utility/Centre';
import { AUTH_TOKEN_FOR_DEVELOPMENT } from '../../constants';
import NoProductsFound from '../../animations/components/NoProductsFound';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		},
	addBtn: {},
	addBtnContainer: { display: 'flex', justifyContent: 'flex-end', marginBottom: 50 }
}));

const Index: React.FC<RouteComponentProps> = ({}) => {
	const { products, setProducts } = useProductStore();
	const { data, error, loading, request: getProducts } = useApi(productsApi.getProducts);
	const classes = useStyles();
	useEffect(() => {
		getProducts(AUTH_TOKEN_FOR_DEVELOPMENT);
	}, []);
	useEffect(
		() => {
			if (data) {
				setProducts(data as any);
			}
		},
		[
			data
		]
	);
	if (error) {
		return <ErrorPage />;
	}
	if (loading || !products) {
		return (
			<Centre>
				<AppLoader />
			</Centre>
		);
	}
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
			{
				products.length === 0 ? <NoProductsFound /> :
				<ProductTable products={products} />}
		</div>
	);
};

export default Index;

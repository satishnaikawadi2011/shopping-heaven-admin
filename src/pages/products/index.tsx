import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { RouteComponentProps } from 'react-router';

import useApi from '../../hooks/useApi';
import productsApi from '../../api/products';
import categoriesApi from '../../api/categories';
import ErrorPage from '../../animations/components/ErrorPage';
import AppLoader from '../../animations/components/AppLoader';
import { useProductStore } from '../../store/products';
import ProductTable from '../../components/UI/ProductTable';
import Centre from '../../components/utility/Centre';
import NoProductsFound from '../../animations/components/NoProductsFound';
import { useCategoryStore } from '../../store/categories';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import { useAuthStore } from '../../store/auth';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		},
	addBtn: {},
	addBtnContainer: { display: 'flex', justifyContent: 'flex-end', marginBottom: 50 }
}));

const Index: React.FC<RouteComponentProps> = ({ history }) => {
	const { token } = useAuthStore();
	const { products, setProducts } = useProductStore();
	const { categories, setCategories } = useCategoryStore();
	const { data, error, loading, request: getProducts } = useApi(productsApi.getProducts);
	const { data: categoryData, loading: catLoading, error: catError, request: getCategories } = useApi(
		categoriesApi.getCategories
	);
	const { data: createdProduct, error: createErr, loading: createLoad, request: createProduct } = useApi(
		productsApi.createProduct
	);
	const classes = useStyles();
	useEffect(
		() => {
			if (createdProduct) {
				history.push(`/products/${(createdProduct! as any)._id}`);
			}
		},
		[
			history,
			createdProduct
		]
	);
	const handleAddProduct = async () => {
		await createProduct(token);
	};
	useEffect(() => {
		getProducts(token);
		getCategories(token);
	}, []);
	useEffect(
		() => {
			if (data) {
				setProducts(data as any);
			}
			if (categoryData) {
				setCategories(categoryData as any);
			}
		},
		[
			data,
			categoryData,
			setProducts,
			setCategories
		]
	);
	if (error || catError || createErr) {
		return (
			<LayoutWrapper>
				<ErrorPage />
			</LayoutWrapper>
		);
	}
	if (loading || !products || catLoading || !categories || createLoad) {
		return (
			<LayoutWrapper>
				<Centre>
					<AppLoader />
				</Centre>
			</LayoutWrapper>
		);
	}
	return (
		<LayoutWrapper>
			<div>
				<Typography className={classes.title} variant="h3" component="h1">
					Manage Products
				</Typography>
				<div className={classes.addBtnContainer}>
					<Button
						variant="contained"
						className={classes.addBtn}
						onClick={handleAddProduct}
						color="primary"
						startIcon={<AddIcon />}
					>
						Add Product
					</Button>
				</div>
				{
					products.length === 0 ? <NoProductsFound /> :
					<ProductTable products={products} categories={categories} />}
			</div>
		</LayoutWrapper>
	);
};

export default Index;

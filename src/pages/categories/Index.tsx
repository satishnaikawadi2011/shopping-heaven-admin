import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { RouteComponentProps } from 'react-router';

import useApi from '../../hooks/useApi';
import categoriesApi from '../../api/categories';
import ErrorPage from '../../animations/components/ErrorPage';
import AppLoader from '../../animations/components/AppLoader';
import Centre from '../../components/utility/Centre';
import { AUTH_TOKEN_FOR_DEVELOPMENT } from '../../constants';
import { useCategoryStore } from '../../store/categories';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import NoData from '../../animations/components/NoData';
import CategoryTable from '../../components/UI/CategoryTable';
import AddCategoryDialog from '../../components/UI/AddCategoryDialog';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		},
	addBtn: {},
	addBtnContainer: { display: 'flex', justifyContent: 'flex-end', marginBottom: 50 }
}));

const CategoryHome: React.FC<RouteComponentProps> = ({ history }) => {
	const [
		open,
		setOpen
	] = useState(false);
	const [
		addCategorySuccess,
		setAddCategorySuccess
	] = useState(false);
	const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setAddCategorySuccess(false);
	};
	const { categories, setCategories, addCategory } = useCategoryStore();
	const { data: categoryData, loading: catLoading, error: catError, request: getCategories } = useApi(
		categoriesApi.getCategories
	);
	const classes = useStyles();
	useEffect(
		() => {
			getCategories(AUTH_TOKEN_FOR_DEVELOPMENT);
		},
		[
			open
		]
	);
	useEffect(
		() => {
			if (categoryData) {
				setCategories(categoryData as any);
			}
		},
		[
			categoryData,
			setCategories
		]
	);
	if (catError) {
		return (
			<LayoutWrapper>
				<ErrorPage />
			</LayoutWrapper>
		);
	}
	if (catLoading || !categories) {
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
			<AddCategoryDialog open={open} handleClose={() => setOpen(false)} />
			<div>
				<Typography className={classes.title} variant="h3" component="h1">
					Manage Categories
				</Typography>
				<div className={classes.addBtnContainer}>
					<Button
						variant="contained"
						className={classes.addBtn}
						color="primary"
						onClick={() => setOpen(true)}
						startIcon={<AddIcon />}
					>
						Add Category
					</Button>
				</div>
				{
					categories.length === 0 ? <NoData message="No data found related to categories,add some." /> :
					<CategoryTable categories={categories} />}
			</div>
		</LayoutWrapper>
	);
};

export default CategoryHome;

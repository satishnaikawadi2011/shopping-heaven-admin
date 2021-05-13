import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup'

import { Product } from '../../models/Product';
import useApi from '../../hooks/useApi';
import productsApi from '../../api/products';
import ErrorPage from '../../animations/components/ErrorPage';
import Centre from '../../components/utility/Centre';
import AppLoader from '../../animations/components/AppLoader';
import { AUTH_TOKEN_FOR_DEVELOPMENT } from '../../constants';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import FormContainer from '../../components/form/FormContainer';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		},
	backBtn: {},
	backBtnContainer: { display: 'flex', justifyContent: 'flex-end', marginBottom: 50 }
}));

const EditProduct: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
	const productId = match.params.id;
	const [
		product,
		setProduct
	] = useState<Product>();
	const classes = useStyles();
	const { data, error, loading, request: getProduct } = useApi(productsApi.getProduct);
	useEffect(() => {
		getProduct(AUTH_TOKEN_FOR_DEVELOPMENT, productId);
	}, []);
	useEffect(
		() => {
			if (data) {
				setProduct(data as any);
			}
		},
		[
			data
		]
	);
	if (error) {
		return <ErrorPage />;
	}
	if (loading || !product) {
		return (
			<Centre>
				<AppLoader />
			</Centre>
		);
    }
    const initialValues = {
        title: product?.title,
        price: product.price,
        description: product.description
    }
    const produdctValidationSchema = Yup.object({
        title: Yup.string().required(),
        price: Yup.number().integer().positive(),
        description: Yup.string().required()
    })
	return (
		<div>
			<div>
				<Typography className={classes.title} variant="h3" component="h1">
					Edit Product Info
				</Typography>
				<div className={classes.backBtnContainer}>
					<Button
						onClick={() => history.goBack()}
						variant="contained"
						className={classes.backBtn}
						startIcon={<ArrowBackIcon />}
					>
						Go Back
					</Button>
                </div>
                <FormContainer>
                    <AppForm initialValues={initialValues} validationSchema={produdctValidationSchema} onSubmit={() => {}}>
                    <div>
                        <AppFormField
                        fieldName='title'
                        label='Title'
                        placeholder='Title for product ...'
                        variant='filled'
                    />
                    <AppFormField
                        fieldName='price'
                        label='Price'
                        placeholder='Price for product ...'
                        variant='filled'
                    />
                    <AppFormField
                        fieldName='description'
                        label='Description'
                        placeholder='Description for product ...'
                            variant='filled'
                            multiline
                    />
                   </div>
                </AppForm>
                </FormContainer>
			</div>
		</div>
	);
};

export default EditProduct;

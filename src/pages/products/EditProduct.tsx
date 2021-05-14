import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup'

import { Product } from '../../models/Product';
import useApi from '../../hooks/useApi';
import productsApi, { UpdateProductData } from '../../api/products';
import categoriesApi from '../../api/categories';
import ErrorPage from '../../animations/components/ErrorPage';
import Centre from '../../components/utility/Centre';
import AppLoader from '../../animations/components/AppLoader';
import { AUTH_TOKEN_FOR_DEVELOPMENT, IMAGE_URL_PREFIX } from '../../constants';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import FormContainer from '../../components/form/FormContainer';
import { useCategoryStore } from '../../store/categories';
import AppSelectField from '../../components/form/AppSelectField';
import ImageCard from '../../components/UI/ImageCard';
import useFileUpload from '../../hooks/useFileUpload';
import SubmitButton from '../../components/form/SubmitButton';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import AppAlert from '../../components/UI/AppAlert';
import AppSnackbar from '../../components/UI/AppSnackbar';
import { FormikHelpers } from 'formik';



const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		},
	backBtn: {},
	backBtnContainer: { display: 'flex', justifyContent: 'flex-end', marginBottom: 50 },
	uploadButton: {
		marginTop:20
	}
}));

	type Values = {
		title: string;
		price: number;
		description:string;
		category: string;
		image:string;
	}

const EditProduct: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
	const productId = match.params.id;
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
	const [updateLoad, setUpdateLoad] = useState(false);
	const [updateError, setUpdateError] = useState(false);
	const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };
	const [
		product,
		setProduct
	] = useState<Product>();
	const classes = useStyles();
	const { data, error, loading, request: getProduct } = useApi(productsApi.getProduct);
	const { categories, setCategories } = useCategoryStore();
	const { data: categoryData, loading: catLoading, error: catError, request: getCategories } = useApi(
		categoriesApi.getCategories
	);
	const { error: uploadErr, image, request: uploadImage, uploading } = useFileUpload(AUTH_TOKEN_FOR_DEVELOPMENT)
	useEffect(() => {
		getProduct(AUTH_TOKEN_FOR_DEVELOPMENT, productId);
		getCategories(AUTH_TOKEN_FOR_DEVELOPMENT);
	}, []);
	useEffect(
		() => {
			if (data) {
				setProduct(data as any);
			}
				if (categoryData) {
				setCategories(categoryData as any);
			}
		},
		[
			data,
			categoryData,
			setProduct,
			setCategories
		]
	);
	if (error || catError || uploadErr || updateError) {
		return <LayoutWrapper>
			<ErrorPage />
		</LayoutWrapper>
	}
	if (loading || !product || catLoading || !categories  || updateLoad) {
		return (
			<LayoutWrapper>
				<Centre>
				<AppLoader />
			</Centre>
			</LayoutWrapper>
		);
	}
    const initialValues = {
        title:product?.title,
        price:product.price,
		description:product.description,
		category: product.categoryId,
		image:product.image
	}
    const produdctValidationSchema = Yup.object({
        title: Yup.string().required(),
        price: Yup.number().integer().positive(),
		description: Yup.string().required(),
		category: Yup.string().required(),
		image:Yup.string().required()
	})
	const options = categories.map((cat) => {
		return {
			label: cat.name,
			value:cat._id
		}
	})
	const submitHandler = async (values: any,actions:FormikHelpers<Values>) => {
		const productData: UpdateProductData = {
			_id: product._id,
			categoryId: values.category,
			description: values.description,
			image:image?image:values.image,
			price: values.price,
			title:values.title
		}
		setUpdateLoad(true);
		const response = await productsApi.updateProduct(AUTH_TOKEN_FOR_DEVELOPMENT, productData)
		setUpdateLoad(false)

		if (!response.ok) return setUpdateError(true);

		setUpdateError(false)
		window.location.reload();
		setIsSnackbarOpen(true);
	}
	return (
		<LayoutWrapper>
			<AppSnackbar handleSnackbarClose={handleSnackbarClose} message='Updated the product info successfully !!!!' open={isSnackbarOpen} />
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
                    <AppForm initialValues={initialValues} validationSchema={produdctValidationSchema} onSubmit={submitHandler}>
						<div>
							<AppAlert style={{maxWidth:600,marginBottom:30}} severity="warning">Remember to click <b>Update Product</b> button present at bottom after editing otherwise product will not be updated!!</AppAlert>
                        <AppFormField
                        fieldName='title'
                        label='Title'
                        placeholder='Title for product ...'
									variant='filled'
									fullWidth
                    />
                    <AppFormField
                        fieldName='price'
                        label='Price'
                        placeholder='Price for product ...'
									variant='filled'
									fullWidth
                    />
                    <AppFormField
                        fieldName='description'
                        label='Description'
                        placeholder='Description for product ...'
                            variant='filled'
									multiline
									fullWidth
							/>
							<AppSelectField fieldName='category' options={options} label='Category' />
							                    <AppFormField
                        fieldName='image'
								label='Image'
									disabled
									fullWidth
								variant='filled'
								value={image ? image : product.image}
							/>
							{uploading ? <AppLoader height={100} width={100}/> :<ImageCard title={product.title!} image={`${IMAGE_URL_PREFIX}${image ? image :product.image}`} />}
							<Button
								variant="contained"
								component="label"
								className={classes.uploadButton}
>
  Upload File
  <input
    type="file"
									hidden
									onChange={(e) => uploadImage(e)}
  />
							</Button>
							<br /><SubmitButton style={{marginTop:20}} variant='contained' title='Update Product' />
						</div>
                </AppForm>
                </FormContainer>
			</div>
		</div>
		</LayoutWrapper>
	);
};

export default EditProduct;

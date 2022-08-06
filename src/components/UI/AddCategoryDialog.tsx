import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';

import AppForm from '../form/AppForm';
import AppFormField from '../form/AppFormField';
import SubmitButton from '../form/SubmitButton';
import useApi from '../../hooks/useApi';
import categoriesApi from '../../api/categories';
import AppLoader from '../../animations/components/AppLoader';
import { useCategoryStore } from '../../store/categories';
import { FormHelperText } from '@material-ui/core';
import { useAuthStore } from '../../store/auth';

interface AddCatProps {
	open: boolean;
	handleClose: () => void;
}

const initialValues = {
	name: ''
};

const validationSchema = Yup.object({
	name: Yup.string().required('Category name is required !!')
});

const AddCategoryDialog: React.FC<AddCatProps> = ({ handleClose, open }) => {
	const { data, error, loading, request } = useApi(categoriesApi.createCategory);

	const { token } = useAuthStore();
	const submitHandler = (values: any) => {
		request(token, values.name);
	};
	useEffect(
		() => {
			if (data && !error) {
				handleClose();
			}
		},
		[
			data,
			handleClose,
			error
		]
	);
	return (
		<div>
			<Dialog
				open={open}
				onClose={

						loading ? () => {} :
						handleClose
				}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add Category</DialogTitle>
				{
					<AppForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
						<DialogContent>
							<DialogContentText>
								To add new product category, please provide the name of category below.
							</DialogContentText>
							{
								loading ? <AppLoader height={150} width={150} /> :
								<AppFormField autoFocus fullWidth label="Category Name" fieldName="name" />}
							{error && (
								<FormHelperText error>{'This category with this name already exists.'}</FormHelperText>
							)}
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} disabled={loading} color="primary">
								Cancel
							</Button>
							<SubmitButton title="submit" disabled={loading} />
						</DialogActions>
					</AppForm>
				}
			</Dialog>
		</div>
	);
};

export default AddCategoryDialog;

import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import SubmitButton from '../../components/form/SubmitButton';

import LayoutWrapper from '../../components/layout/LayoutWrapper';
import authApi from '../../api/auth';
import useApi from '../../hooks/useApi';
import AppErrorMessage from '../../components/form/AppErrorMessage';
import { useAuthStore } from '../../store/auth';
import AppLoader from '../../animations/components/AppLoader';
import { RouteComponentProps } from 'react-router';
import storage from '../../utils/storage';

const initialValues = {
	username: '',
	password: ''
};

const authSchema = Yup.object({
	username: Yup.string().required().min(3),
	password: Yup.string().required().min(6).max(12)
});

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
	const { data, error, loading, request: loginUser } = useApi(authApi.loginUser);
	const { setToken, setUser, user, token } = useAuthStore();
	const submitHandler = (values: any) => {
		const { username, password } = values;
		loginUser(username, password);
	};
	useEffect(
		() => {
			if (data) {
				const loginData = data as any;
				setToken(loginData.token as any);
				setUser(loginData.user as any);
				storage.store('authData', { user: loginData.user, token: loginData.token });
				history.replace('/products');
			}
		},
		[
			data
		]
	);
	useEffect(
		() => {
			if (user && token) {
				history.replace('/products');
			}
		},
		[
			user,
			token,
			history
		]
	);
	console.log(data);
	return (
		<LayoutWrapper noDrawer>
			<div
				style={{
					width: '95vw',
					height: '80vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<div style={{ maxWidth: 600, width: '100%' }}>
					<Typography variant="h2" component="h1" style={{ marginBottom: 20 }}>
						Login
					</Typography>
					<AppForm initialValues={initialValues} validationSchema={authSchema} onSubmit={submitHandler}>
						<AppFormField
							fieldName="username"
							label="Username"
							placeholder="Enter your username ..."
							variant="filled"
							fullWidth
						/>
						<AppFormField
							fieldName="password"
							label="Password"
							placeholder="Enter your password ..."
							variant="filled"
							fullWidth
							type="password"
						/>
						<AppErrorMessage visible={error} errorMessage="Please check your credentials !!" />
						{
							loading ? <AppLoader height={100} width={100} /> :
							<SubmitButton disabled={loading} title="login" />}
					</AppForm>
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default LoginPage;

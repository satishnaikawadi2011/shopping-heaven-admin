import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import useApi from '../../hooks/useApi';
import usersApi from '../../api/users';
import ErrorPage from '../../animations/components/ErrorPage';
import AppLoader from '../../animations/components/AppLoader';
import Centre from '../../components/utility/Centre';
import { AUTH_TOKEN_FOR_DEVELOPMENT } from '../../constants';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import NoData from '../../animations/components/NoData';
import { useUserStore } from '../../store/users';
import CustomerTable from '../../components/UI/CustomerTable';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center',
			marginBottom: 30
		}
}));

const UserHome: React.FC<RouteComponentProps> = ({ history }) => {
	const { setUsers, users } = useUserStore();
	const { data, error, loading, request: getUsers } = useApi(usersApi.getUsers);
	const classes = useStyles();
	useEffect(() => {
		getUsers(AUTH_TOKEN_FOR_DEVELOPMENT);
	}, []);
	useEffect(
		() => {
			if (data) {
				setUsers(data as any);
			}
		},
		[
			data
		]
	);
	if (error) {
		return (
			<LayoutWrapper>
				<ErrorPage />
			</LayoutWrapper>
		);
	}
	if (loading || !users) {
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
					Manage Users
				</Typography>
				{
					users.length === 0 ? <NoData message="No data found related to customers/users !!" /> :
					<CustomerTable customers={users} />}
			</div>
		</LayoutWrapper>
	);
};

export default UserHome;

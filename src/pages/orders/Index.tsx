import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import useApi from '../../hooks/useApi';
import ordersApi from '../../api/orders';
import ErrorPage from '../../animations/components/ErrorPage';
import AppLoader from '../../animations/components/AppLoader';
import Centre from '../../components/utility/Centre';
import { AUTH_TOKEN_FOR_DEVELOPMENT } from '../../constants';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import NoData from '../../animations/components/NoData';
import { useOrderStore } from '../../store/orders';
import OrderTable from '../../components/UI/OrderTable';

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center',
			marginBottom: 30
		}
}));

const OrderHome: React.FC<RouteComponentProps> = ({ history }) => {
	const { orders, setOrders } = useOrderStore();
	const { data, error, loading, request: getOrders } = useApi(ordersApi.getOrders);
	const classes = useStyles();
	useEffect(() => {
		getOrders(AUTH_TOKEN_FOR_DEVELOPMENT);
	}, []);
	useEffect(
		() => {
			if (data) {
				setOrders(data as any);
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
	if (loading || !orders) {
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
					Manage Orders
				</Typography>
				{
					orders.length === 0 ? <NoData message="No data found related to orders !!" /> :
					<OrderTable orders={orders} />}
			</div>
		</LayoutWrapper>
	);
};

export default OrderHome;

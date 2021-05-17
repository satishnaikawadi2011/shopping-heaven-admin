import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AppLoader from '../../animations/components/AppLoader';
import ErrorPage from '../../animations/components/ErrorPage';
import productsApi from '../../api/products';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import StatCard from '../../components/UI/StatCard';
import Centre from '../../components/utility/Centre';
import useApi from '../../hooks/useApi';
import { useAuthStore } from '../../store/auth';
import PeopleIcon from '@material-ui/icons/People';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CategoryIcon from '@material-ui/icons/Category';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HelpIcon from '@material-ui/icons/Help';
import MoneyIcon from '@material-ui/icons/Money';

interface StatType {
	productCount: number;
	categoryCount: number;
	selledProductCount: number;
	deliveredOrderCount: number;
	pendingOrderCount: number;
	customerCount: number;
}

const useStyles = makeStyles((props) => ({
	title:
		{
			textAlign: 'center'
		}
}));

const DashboardPage = () => {
	const classes = useStyles();
	const { token } = useAuthStore();
	const [
		stats,
		setStats
	] = useState<StatType | null>(null);
	const { data, error, loading, request: getStats } = useApi(productsApi.getStats);
	useEffect(() => {
		getStats(token);
	}, []);
	useEffect(
		() => {
			if (data) {
				setStats(data as any);
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
	if (loading || !stats) {
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
			<Typography className={classes.title} variant="h3" component="h1">
				Admin Dashboard
			</Typography>
			<Grid style={{ marginTop: 30, marginBottom: 30 }} justify="center" container spacing={5}>
				<Grid item md={4} sm={6}>
					<StatCard
						backgroundColor="#2196f3"
						color="#ffffff"
						icon={<PeopleIcon style={{ color: '#ffffff', fontSize: 90 }} />}
						stat={stats.customerCount}
						title={`Total Users`}
					/>
				</Grid>
				<Grid item md={4} sm={6}>
					<StatCard
						backgroundColor="#e91e63"
						color="#ffffff"
						icon={<LocalMallIcon style={{ color: '#ffffff', fontSize: 90 }} />}
						stat={stats.productCount}
						title={`Total Products`}
					/>
				</Grid>
				<Grid item md={4} sm={6}>
					<StatCard
						backgroundColor="#ff5722"
						color="#ffffff"
						icon={<CategoryIcon style={{ color: '#ffffff', fontSize: 90 }} />}
						stat={stats.categoryCount}
						title={`Total Product Categories`}
					/>
				</Grid>
				<Grid item md={4} sm={6}>
					<StatCard
						backgroundColor="#009688"
						color="#ffffff"
						icon={<LocalShippingIcon style={{ color: '#ffffff', fontSize: 90 }} />}
						stat={stats.deliveredOrderCount}
						title={`Total Delivered Orders`}
					/>
				</Grid>
				<Grid item md={4} sm={6}>
					<StatCard
						backgroundColor="#c6ff00"
						color="#000000"
						icon={<HelpIcon style={{ color: '#000000', fontSize: 90 }} />}
						stat={stats.pendingOrderCount}
						title={`Total Pending Orders`}
					/>
				</Grid>
				<Grid item md={4} sm={6}>
					<StatCard
						backgroundColor="#4caf50"
						color="#000000"
						icon={<MoneyIcon style={{ color: '#000000', fontSize: 90 }} />}
						stat={stats.selledProductCount}
						title={`Total Selled Products`}
					/>
				</Grid>
			</Grid>
		</LayoutWrapper>
	);
};

export default DashboardPage;

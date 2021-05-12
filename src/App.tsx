import React from 'react';
import './App.css';
import LayoutWrapper from './components/layout/LayoutWrapper';
import StatCard from './components/UI/StatCard';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

function App() {
	return (
		<LayoutWrapper>
			<StatCard
				backgroundColor={'red'}
				color="#ffffff"
				title="Total Customers"
				stat={20}
				icon={<PeopleIcon style={{ width: 80, height: 80, color: 'white' }} />}
			/>
		</LayoutWrapper>
	);
}

export default App;

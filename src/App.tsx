import React from 'react';
import './App.css';
import LayoutWrapper from './components/layout/LayoutWrapper';
import CustomerTable from './components/UI/CustomerTable';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

function App() {
	return (
		<LayoutWrapper>
			<CustomerTable
				customers={[
					{
						__v: 2,
						_id: 'dmdkkd',
						createdAt: 'djjdjd',
						email: 'djdjjdj',
						isAdmin: true,
						updatedAt: 'jdjdj',
						password: 'djdjjd',
						username: 'djdjjdjd'
					},
					{
						__v: 2,
						_id: 'dmdkd',
						createdAt: 'djjdjd',
						email: 'djdjjdj',
						isAdmin: false,
						updatedAt: 'jdjdj',
						password: 'djdjjd',
						username: 'djdjjdjd'
					}
				]}
			/>
		</LayoutWrapper>
	);
}

export default App;

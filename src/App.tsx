import React from 'react';
import './App.css';
import LayoutWrapper from './components/layout/LayoutWrapper';
import CategoryTable from './components/UI/CategoryTable';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

function App() {
	return (
		<LayoutWrapper>
			<CategoryTable
				categories={[
					{
						__v: 7474,
						_id: 'dhjdjd',
						createdAt: 'djdjjd',
						name: 'jsjjdjd',
						updatedAt: 'skdkdkkd'
					}
				]}
			/>
		</LayoutWrapper>
	);
}

export default App;

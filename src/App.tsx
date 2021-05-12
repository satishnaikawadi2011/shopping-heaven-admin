import React from 'react';
import './App.css';
import LayoutWrapper from './components/layout/LayoutWrapper';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
import ProductTable from './components/UI/ProductTable';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

function App() {
	return (
		<LayoutWrapper>
			<ProductTable
				products={[
					{ _id: 'jdjd' },
					{ _id: 'jdjddd' }
				]}
			/>
		</LayoutWrapper>
	);
}

export default App;

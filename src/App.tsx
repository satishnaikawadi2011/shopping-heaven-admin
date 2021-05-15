import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Yup from 'yup';

import './App.css';
import NotFoundPage from './animations/components/NotFoundPage';
import EditProduct from './pages/products/EditProduct';
import ProductHome from './pages/products';
import CategoryHome from './pages/categories/Index';
import AddCategoryDialog from './components/UI/AddCategoryDialog';
import Button from '@material-ui/core/Button';
import OrderHome from './pages/orders/Index';
import OrderDetails from './pages/orders/OrderDetails';
import UserHome from './pages/users';
// import OrderTable from './components/UI/OrderTable';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={ProductHome} exact />
				<Route path="/products/:id" exact component={EditProduct} />
				<Route path="/categories" exact component={CategoryHome} />
				<Route path="/orders" exact component={OrderHome} />
				<Route path="/orders/:id" exact component={OrderDetails} />
				<Route path="/users" exact component={UserHome} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
}

export default App;

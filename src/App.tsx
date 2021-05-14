import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Yup from 'yup';

import './App.css';
import NotFoundPage from './animations/components/NotFoundPage';
import EditProduct from './pages/products/EditProduct';
import ProductHome from './pages/products';
import CategoryHome from './pages/categories/Index';
// import OrderTable from './components/UI/OrderTable';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

const schema = Yup.object({
	name: Yup.string().required(),
	password: Yup.string().required(),
	hobby: Yup.string().required()
});

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={ProductHome} exact />
				<Route path="/products/:id" exact component={EditProduct} />
				<Route path="/categories" exact component={CategoryHome} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
}

export default App;

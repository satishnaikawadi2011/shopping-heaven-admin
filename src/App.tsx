import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import NotFoundPage from './animations/components/NotFoundPage';
import EditProduct from './pages/products/EditProduct';
import ProductHome from './pages/products';
import CategoryHome from './pages/categories/Index';
import OrderHome from './pages/orders/Index';
import OrderDetails from './pages/orders/OrderDetails';
import UserHome from './pages/users';
import LoginPage from './pages/login/Index';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { useAuthStore } from './store/auth';
import storage from './utils/storage';

function App() {
	const { setToken, setUser } = useAuthStore();
	useEffect(() => {
		const authData: any = storage.get('authData');
		console.log(authData);
		if (authData) {
			setToken(authData.token);
			setUser(authData.user);
		}
	}, []);
	return (
		<Router>
			<Switch>
				<ProtectedRoute path="/products" component={ProductHome} exact />
				<ProtectedRoute path="/products/:id" exact component={EditProduct} />
				<ProtectedRoute path="/categories" exact component={CategoryHome} />
				<ProtectedRoute path="/orders" exact component={OrderHome} />
				<ProtectedRoute path="/orders/:id" exact component={OrderDetails} />
				<ProtectedRoute path="/users" exact component={UserHome} />
				<Route path="/" exact component={LoginPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
}

export default App;

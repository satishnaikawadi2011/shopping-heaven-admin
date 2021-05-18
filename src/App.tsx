import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import NotFoundPage from './animations/components/NotFoundPage';
import EditProduct from './pages/products/EditProduct';
import ProductHome from './pages/products';
import CategoryHome from './pages/categories/Index';
import OrderHome from './pages/orders/Index';
import OrderDetails from './pages/orders/OrderDetails';
import UserHome from './pages/users';
import LoginPage from './pages/Index';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { useAuthStore } from './store/auth';
import storage from './utils/storage';
import DashboardPage from './pages/dashboard/Index';
import AboutHome from './pages/about/Index';
import { useThemeStore } from './store/theme';
import { CssBaseline } from '@material-ui/core';

function App() {
	const { setToken, setUser } = useAuthStore();
	const { isDark, setIsDark } = useThemeStore();
	useEffect(() => {
		const authData: any = storage.get('authData');
		const themeData: any = storage.get('themeData');
		// console.log(authData);
		if (authData) {
			setToken(authData.token);
			setUser(authData.user);
		}
		if (themeData) {
			setIsDark(themeData.isDark);
		}
	}, []);
	const theme = createMuiTheme({
		palette:
			{
				primary:
					{
						main: '#c51162'
					},
				secondary:
					{
						main: '#651fff'
					},
				type:

						isDark ? 'dark' :
						'light'
			}
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<ProtectedRoute path="/dashboard" component={DashboardPage} exact />
					<ProtectedRoute path="/products" component={ProductHome} exact />
					<ProtectedRoute path="/products/:id" exact component={EditProduct} />
					<ProtectedRoute path="/categories" exact component={CategoryHome} />
					<ProtectedRoute path="/orders" exact component={OrderHome} />
					<ProtectedRoute path="/orders/:id" exact component={OrderDetails} />
					<ProtectedRoute path="/users" exact component={UserHome} />
					<Route path="/" exact component={LoginPage} />
					<Route path="/about" exact component={AboutHome} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;

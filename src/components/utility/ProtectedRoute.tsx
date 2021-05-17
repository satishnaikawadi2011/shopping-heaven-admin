import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...props }) => {
	const { user, token } = useAuthStore();
	if (user && token) {
		return <Route component={component} {...props} />;
	}
	else {
		return <Redirect to="/" />;
	}
};

export default ProtectedRoute;

import React from 'react';
import './App.css';
import SHAppBar from './components/layout/SHAppBar';
import AppDrawer from './components/layout/AppDrawer';

function App() {
	return (
		<React.Fragment>
			<SHAppBar />
			<AppDrawer />
		</React.Fragment>
	);
}

export default App;

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SHAppBar from './SHAppBar';
import AppDrawer from './AppDrawer';

interface LayoutProps {
	noDrawer?: boolean;
	noMenu?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root:
			{
				display: 'flex'
			},
		toolbar:
			{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				padding: theme.spacing(0, 1),
				// necessary for content to be below app bar
				...theme.mixins.toolbar
			},
		content:
			{
				flexGrow: 1,
				padding: theme.spacing(3)
			}
	})
);

const LayoutWrapper: React.FC<LayoutProps> = ({ children, noDrawer = false, noMenu = false }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<SHAppBar noMenu={noMenu} />
			{!noDrawer && <AppDrawer />}
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
};

export default LayoutWrapper;

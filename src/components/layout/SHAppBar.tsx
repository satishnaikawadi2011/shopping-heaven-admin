import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDrawerStore } from '../../store/drawer';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import { useAuthStore } from '../../store/auth';
import { useHistory } from 'react-router';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar:
			{
				zIndex: theme.zIndex.drawer + 1,
				transition:
					theme.transitions.create(
						[
							'width',
							'margin'
						],
						{
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen
						}
					)
			},
		appBarShift:
			{
				marginLeft: drawerWidth,
				width: `calc(100% - ${drawerWidth}px)`,
				transition:
					theme.transitions.create(
						[
							'width',
							'margin'
						],
						{
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen
						}
					)
			},
		menuButton:
			{
				marginRight: 36
			},
		hide:
			{
				display: 'none'
			},
		title:
			{
				flexGrow: 1
			}
	})
);

export default function SHAppBar() {
	const history = useHistory();
	const classes = useStyles();
	const { isDrawerOpen, setIsDrawerOpen } = useDrawerStore();
	const { user, token, logout } = useAuthStore();
	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};
	const isAuthenticated = !!user && !!token;
	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: isDrawerOpen
			})}
		>
			<Toolbar>
				{
					isAuthenticated ? <IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: isDrawerOpen
						})}
					>
						<MenuIcon />
					</IconButton> :
					null}
				<Typography className={classes.title} variant="h6" noWrap>
					Shopping Heaven
				</Typography>
				<Button style={{ marginRight: 20 }} color="inherit" startIcon={<InfoIcon />}>
					About
				</Button>
				{
					isAuthenticated ? <Button onClick={() => logout()} color="inherit" startIcon={<ExitToAppIcon />}>
						Logout
					</Button> :
					<Button onClick={() => history.push('/')} color="inherit" startIcon={<VpnKeyIcon />}>
						Login
					</Button>}
			</Toolbar>
		</AppBar>
	);
}

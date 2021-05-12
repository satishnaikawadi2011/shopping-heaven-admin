import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrawerStore } from '../../store/drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import ShopIcon from '@material-ui/icons/Shop';

const drawerWidth = 240;

interface MenuItem {
	icon: any;
	onClick: () => void;
	name: string;
}

const drawerMenuItems: MenuItem[] = [
	{
		icon: <DashboardIcon />,
		name: 'Dashboard',
		onClick: () => {}
	},
	{
		icon: <ShopIcon />,
		name: 'Products',
		onClick: () => {}
	},
	{
		icon: <CategoryIcon />,
		name: 'Categories',
		onClick: () => {}
	},
	{
		icon: <LocalShippingIcon />,
		name: 'Orders',
		onClick: () => {}
	},
	{
		icon: <PeopleIcon />,
		name: 'Customers',
		onClick: () => {}
	}
];

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer:
			{
				width: drawerWidth,
				flexShrink: 0,
				whiteSpace: 'nowrap'
			},
		drawerOpen:
			{
				width: drawerWidth,
				transition:
					theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen
					})
			},
		drawerClose:
			{
				transition:
					theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen
					}),
				overflowX: 'hidden',
				width: theme.spacing(7) + 1,
				[theme.breakpoints.up('sm')]:
					{
						width: theme.spacing(9) + 1
					}
			},
		toolbar:
			{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				padding: theme.spacing(0, 1),
				...theme.mixins.toolbar
			},
		content:
			{
				flexGrow: 1,
				padding: theme.spacing(3)
			}
	})
);

export default function AppDrawer() {
	const classes = useStyles();
	const theme = useTheme();

	const { isDrawerOpen, setIsDrawerOpen } = useDrawerStore();

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: isDrawerOpen,
				[classes.drawerClose]: !isDrawerOpen
			})}
			classes={{
				paper:
					clsx({
						[classes.drawerOpen]: isDrawerOpen,
						[classes.drawerClose]: !isDrawerOpen
					})
			}}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					{
						theme.direction === 'rtl' ? <ChevronRightIcon /> :
						<ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{drawerMenuItems.map(({ icon, name, onClick }) => (
					<ListItem onClick={onClick} button key={name}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={name} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}

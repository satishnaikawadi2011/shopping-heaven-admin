import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((props) => ({
	root:
		{
			minWidth: 275,
			height: 300
		},
	title:
		{
			fontSize: '2.5rem',
			textAlign: 'center'
		},
	icon:
		{
			textAlign: 'center'
		},
	stat:
		{
			textAlign: 'center',
			fontSize: '2.4rem'
		}
}));

interface CardProps {
	icon: any;
	title: string;
	stat: number;
	backgroundColor?: string;
	color?: string;
}

const StatCard: React.FC<CardProps> = ({ icon, stat, title, backgroundColor, color }) => {
	const classes = useStyles();
	return (
		<Card
			style={{ backgroundColor, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
			className={classes.root}
		>
			<CardContent>
				<Typography style={{ color }} className={classes.title} variant="h3">
					{title}
				</Typography>
				<div className={classes.icon}>{icon}</div>
				<Typography style={{ color }} className={classes.stat} variant="h4">
					{stat}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default StatCard;

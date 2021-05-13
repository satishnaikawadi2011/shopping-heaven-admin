import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root:
			{
				maxWidth: 345
			},
		media:
			{
				height: 0,
				paddingTop: '56.25%' // 16:9
			}
	})
);

interface ImageCardProps {
	image: string;
	title: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, title }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={image} title={title} />
		</Card>
	);
};

export default ImageCard;

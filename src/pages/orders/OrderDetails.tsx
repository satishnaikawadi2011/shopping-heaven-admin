import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi from '../../hooks/useApi';
import { Order } from '../../models/Order';
import ordersApi from '../../api/orders';
import { AUTH_TOKEN_FOR_DEVELOPMENT, IMAGE_URL_PREFIX, INDIAN_RUPEE_SIGN } from '../../constants';
import LayoutWrapper from '../../components/layout/LayoutWrapper';
import ErrorPage from '../../animations/components/ErrorPage';
import Centre from '../../components/utility/Centre';
import AppLoader from '../../animations/components/AppLoader';
import {
	CardContent,
	makeStyles,
	Typography,
	Card,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	List,
	Divider,
	Chip,
	Button
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import dayjs from 'dayjs';
import CartAnimation from '../../animations/components/CartAnimation';

const useStyles = makeStyles({
	title:
		{
			textAlign: 'center',
			marginBottom: 30
		},
	card: {
		padding: 100,
		width: 400,
	},
	sectionTitle:
		{
			marginTop: 20,
			marginBottom: 20
		}
});

const OrderDetails: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
	const classes = useStyles();
	const [
		order,
		setOrder
	] = useState<Order>();
	const orderId = match.params.id;
	const { data, error, loading, request: getOrder } = useApi(ordersApi.getOrder);
	useEffect(() => {
		getOrder(AUTH_TOKEN_FOR_DEVELOPMENT, orderId);
	}, []);
	useEffect(
		() => {
			if (data) {
				setOrder(data as any);
			}
		},
		[
			data
		]
	);
	if (error) {
		return (
			<LayoutWrapper>
				<ErrorPage />
			</LayoutWrapper>
		);
	}
	if (loading || !order) {
		return (
			<LayoutWrapper>
				<Centre>
					<AppLoader />
				</Centre>
			</LayoutWrapper>
		);
	}
	return (
		<LayoutWrapper>
			<React.Fragment>
				<Typography className={classes.title} variant="h3" component="h1">
					Order ID : {order._id}
				</Typography>
				<CartAnimation height={200} width={200}/>
				<div style={{display:'flex',justifyContent:'center'}}>
					<Card className={classes.card}>
					<CardContent>
						<section>
							<Typography className={classes.sectionTitle} variant="h4" component="h2">
								User Info
							</Typography>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Avatar>
											<AccountCircleIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary="Username" secondary={(order as any).user.username} />
								</ListItem>
								<Divider />
								<ListItem>
									<ListItemAvatar>
										<Avatar>
											<EmailIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary="Email" secondary={(order as any).user.email} />
								</ListItem>
								<Divider />
							</List>
						</section>
						<section>
							<Typography className={classes.sectionTitle} variant="h4" component="h2">
								Shipping Details
							</Typography>
							<Typography variant="h6" style={{ marginBottom: 10, fontWeight: 'bold' }}>
								{order.shippingAddress.fullName}
							</Typography>
							<Typography variant="body1">{order.shippingAddress.building} , </Typography>
							<Typography variant="body1">{order.shippingAddress.road} , </Typography>
							<Typography variant="body1">
								{order.shippingAddress.city} , {order.shippingAddress.state}{' '}
							</Typography>
							<Typography variant="body1">
								{order.shippingAddress.country} - {(order.shippingAddress as any).postalCode}{' '}
							</Typography>
							<Typography variant="h6" style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}>
								Phone Number : {order.shippingAddress.phoneNumber}
							</Typography>
							<Divider />
						</section>
						<section>
							<Typography className={classes.sectionTitle} variant="h4" component="h2">
								Order Items
							</Typography>
							<List>
								{order.orderItems.map((orderItem) => {
									return (
										<React.Fragment key={orderItem._id}>
											<ListItem>
												<ListItemAvatar>
													<Avatar src={`${IMAGE_URL_PREFIX}${orderItem.image}`} />
												</ListItemAvatar>
												<ListItemText
													primary={orderItem.title}
													secondary={`${INDIAN_RUPEE_SIGN}${orderItem.price} x ${orderItem.qty}  =   ${INDIAN_RUPEE_SIGN}${orderItem.price *
														orderItem.qty} `}
												/>
											</ListItem>
											<Divider />
										</React.Fragment>
									);
								})}
							</List>
						</section>
						<section>
							<Typography className={classes.sectionTitle} variant="h4" component="h2">
								Pricing Details
							</Typography>
							<ListItem>
								<ListItemAvatar>
									<Avatar>{INDIAN_RUPEE_SIGN}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
									primary={`Itmes Price : ${INDIAN_RUPEE_SIGN}${order.itemsPrice}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar>{INDIAN_RUPEE_SIGN}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
									primary={`Tax Price : ${INDIAN_RUPEE_SIGN}${order.taxPrice}`}
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar>{INDIAN_RUPEE_SIGN}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
									primary={`Shipping Price : ${INDIAN_RUPEE_SIGN}${order.shippingPrice}`}
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemAvatar>
									<Avatar>{INDIAN_RUPEE_SIGN}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
									primary={`Total Payable Amount : ${INDIAN_RUPEE_SIGN}${order.totalPrice}`}
								/>
							</ListItem>
						</section>
						<section>
							<Typography className={classes.sectionTitle} variant="h4" component="h2">
								Other Details
							</Typography>
							<div style={{marginTop:10,marginBottom:10}}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Payment Status :{' '}
								</Typography>
									<Chip label={ order.isPaid ? 'Paid':'Not Paid'}/>
								</div>
								{order?.paidAt && (
									<Typography variant="caption">
										Paid on {dayjs(order.paidAt).format('DD/MM/YYYY   hh:mm:ss')}
									</Typography>
								)}
								
							</div>
							<Divider/>
							<div style={{marginTop:10,marginBottom:10}}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Delivery Status :{' '}
								</Typography>
									<Chip label={ order.isDelivered ? 'Delivered':'Not Delivered'}/>
								</div>
								{order?.isDelivered && (
									<Typography variant="caption">
										Delivered on {dayjs(order.deliveredAt).format('DD/MM/YYYY   hh:mm:ss')}
									</Typography>
								)}
								
							</div>
							<Divider />
														<div style={{marginTop:10,marginBottom:10}}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Payment Method :{' '}
								</Typography>
									<Chip label={ order.paymentMethod === 'COD' ? 'Cash On Delivery':'Credit Card'}/>
								</div>
							</div>
							<Divider />
						</section>
						{order?.isPaid && <section>
								<Typography className={classes.sectionTitle} variant="h4" component="h2">
								Payment Result
							</Typography>
							<div style={{ marginTop: 10, marginBottom: 10 }}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Payment ID :{' '}
									</Typography>
									<Typography variant='h6'>{order.paymentResult?.id}</Typography>
								</div>
							</div>
							<Divider />
							<div style={{ marginTop: 10, marginBottom: 10 }}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Amount :{' '}
									</Typography>
									<Typography variant='h6'>{INDIAN_RUPEE_SIGN}{order.paymentResult?.amount}</Typography>
								</div>
							</div>
							<Divider />
							<div style={{ marginTop: 10, marginBottom: 10 }}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Currency :{' '}
									</Typography>
									<Typography variant='h6'>{order.paymentResult?.currency?.toUpperCase()}</Typography>
								</div>
							</div>
							<Divider />
							<div style={{ marginTop: 10, marginBottom: 10 }}>
								<div style={{display:'flex'}}>
									<Typography variant="h6" style={{ fontWeight: 'bold',marginRight:30 }}>
									Payment Method :{' '}
									</Typography>
									<Typography variant='h6'>{order.paymentMethod}</Typography>
								</div>
							</div>
							<Divider />
							{order?.paymentResult?.receipt_url && 
								<Button onClick={() => window.location.replace((order.paymentResult as any).receipt_url)}>
								get receipt
								</Button>}
						</section>}
					</CardContent>
				</Card>
				</div>
			</React.Fragment>
		</LayoutWrapper>
	);
};

export default OrderDetails;

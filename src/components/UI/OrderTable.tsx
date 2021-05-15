import React, { useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Chip, IconButton } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { AUTH_TOKEN_FOR_DEVELOPMENT, INDIAN_RUPEE_SIGN } from '../../constants';
import { Order } from '../../models/Order';
import { useHistory } from 'react-router';
import AppAlertDialog from '../AppAlertDialog';
import { useOrderStore } from '../../store/orders';
import ordersApi from '../../api/orders';

dayjs.extend(relativeTime);

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head:
			{
				backgroundColor: theme.palette.common.black,
				color: theme.palette.common.white
			},
		body:
			{
				fontSize: 14
			}
	})
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root:
			{
				'&:nth-of-type(odd)':
					{
						backgroundColor: theme.palette.action.hover
					}
			}
	})
)(TableRow);

const useStyles = makeStyles({
	table:
		{
			minWidth: 700
		}
});

interface OrderTableProps {
	orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
	const { markOrderAsDelivered, markOrderAsPaid } = useOrderStore();
	const classes = useStyles();
	const history = useHistory();
	const [isPaying, setIsPaying] = useState(false);
	const [
		order,
		setOrder
	] = useState<Order>();
	const [
		openAlert,
		setOpenAlert
	] = useState(false);
	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const handleDelivered = () => {
		markOrderAsDelivered(order?._id as any);
		ordersApi.markAsDelivered(AUTH_TOKEN_FOR_DEVELOPMENT, order?._id as any);
		handleCloseAlert();
	};
		const handlePaid = () => {
		markOrderAsPaid(order?._id as any);
		ordersApi.markOrderAsPaid(AUTH_TOKEN_FOR_DEVELOPMENT, order?._id as any,'inr',order!.totalPrice);
		handleCloseAlert();
	};
	return (
		<React.Fragment>
			<AppAlertDialog
				description={`Are you sure you want to mark this order as ${isPaying ? 'paid':'delivered'} ?`}
				handleClose={handleCloseAlert}
				open={openAlert}
				title={`Mark Order As ${isPaying ? 'Paid':'Delivered'}`}
				onAgree={isPaying ? handlePaid:handleDelivered}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell align="right">Total Amount ({INDIAN_RUPEE_SIGN})</StyledTableCell>
							<StyledTableCell align="right">Checkout on</StyledTableCell>
							<StyledTableCell align="right">Delivery Status</StyledTableCell>
							<StyledTableCell align="right">Payment Status</StyledTableCell>
							<StyledTableCell align="center">Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => (
							<StyledTableRow key={order._id}>
								<StyledTableCell component="th" scope="row">
									{order._id}
								</StyledTableCell>
								<StyledTableCell align="right">{order.totalPrice}</StyledTableCell>
								<StyledTableCell align="right">{dayjs(order.createdAt).fromNow()}</StyledTableCell>
								<StyledTableCell align="right">
									{
										order.isDelivered ? <Chip
											style={{ backgroundColor: 'green', color: 'white' }}
											label="Delivered"
										/> :
										<Chip
											style={{ backgroundColor: 'yellow', color: 'black' }}
											label="Not Delivered"
										/>}
								</StyledTableCell>
								<StyledTableCell align="right">
									{
										order.isPaid ? <Chip
											style={{ backgroundColor: 'green', color: 'white' }}
											label="Paid"
										/> :
										<Chip style={{ backgroundColor: 'yellow', color: 'black' }} label="Pending" />}
								</StyledTableCell>
								<StyledTableCell align="center">
									<Tooltip title="Mark As Delivered">
										<IconButton
											aria-label="edit"
											onClick={() => {
												setIsPaying(false);
												setOrder(order);
												setOpenAlert(true);
											}}
											disabled={order.isDelivered}
										>
											<LocalShippingIcon style={{ color: 'green' }} />
										</IconButton>
									</Tooltip>
									<Tooltip title="Mark As Paid">
										<IconButton aria-label="edit" onClick={() => {
												setIsPaying(true);
												setOrder(order);
												setOpenAlert(true);
											}} disabled={order.isPaid}>
											<PaymentIcon style={{ color: 'green' }} />
										</IconButton>
									</Tooltip>
									<Tooltip title="Details">
										<IconButton
											aria-label="details"
											onClick={() => {
												history.push(`/orders/${order._id}`);
											}}
										>
											<VisibilityIcon style={{ color: 'skyblue' }} />
										</IconButton>
									</Tooltip>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};

export default OrderTable;

import React from 'react';
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

import { INDIAN_RUPEE_SIGN } from '../../constants';
import { Order } from '../../models/Order';
import { useHistory } from 'react-router';

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
	const classes = useStyles();
	const history = useHistory();
	return (
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
									<IconButton aria-label="edit" disabled={order.isDelivered}>
										<LocalShippingIcon style={{ color: 'green' }} />
									</IconButton>
								</Tooltip>
								<Tooltip title="Mark As Paid">
									<IconButton aria-label="edit" disabled={order.isPaid}>
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
	);
};

export default OrderTable;

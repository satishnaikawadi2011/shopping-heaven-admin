import TableCell from '@material-ui/core/TableCell';
import { Theme, createStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles((theme: Theme) =>
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

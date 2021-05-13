import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFormikContext } from 'formik';
import AppErrorMessage from './AppErrorMessage';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl:
			{
				margin: theme.spacing(1),
				minWidth: 120,
				width: '80vw',
				maxWidth: 350
			}
	})
);

interface OptionType {
	value: any;
	label: string;
}

interface SelectProps {
	label: string;
	fieldName: string;
	options: OptionType[];
}

const AppSelectField: React.FC<SelectProps> = ({ label, fieldName, options }) => {
	const [
		open,
		setOpen
	] = React.useState(false);
	const classes = useStyles();
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					onChange={(e) => setFieldValue(fieldName, e.target.value)}
					value={myValues[fieldName]}
					onBlur={() => setFieldTouched(fieldName)}
				>
					{options.map((option) => {
						return (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						);
					})}
				</Select>
				<AppErrorMessage errorMessage={formErrors[fieldName]} visible={formTouched[fieldName]} />
			</FormControl>
		</div>
	);
};

export default AppSelectField;

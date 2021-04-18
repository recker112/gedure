import React, { useState, useEffect, useCallback } from 'react';

//Material-UI
import {
	TextField,
	InputAdornment,
	IconButton,
	FormControl,
	InputLabel,
	FormHelperText,
	Select,
	Switch,
	FormControlLabel,
	Table,
	TableCell,
	TableRow,
	TableBody,
	TableHead,
	Typography,
	TableContainer,
	Paper,
	Link,
	CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import NumberFormat from 'react-number-format';

import { Controller } from 'react-hook-form';

// Components
import useAsyncDebounce from '../hooks/useAsyncDebounce';

const useStyles = makeStyles((theme) => ({
	separer: {
		marginBottom: theme.spacing(2)
	},
}));

export function RenderSwitchFormHook(props) {
	const { name, defaultValue, control, label, labelPlacement='end', ...rest } = props;
	
	return (
		<FormControlLabel
			control={
				<Controller 
					render={({onChange, onBlur, value, ref})=>(
						<Switch
							inputRef={ref}
							onBlur={onBlur}
							onChange={e => onChange(e.currentTarget.checked)}
							checked={value}
							{...rest} 
						/>
					)}
					name={name}
					defaultValue={defaultValue}
					control={control}
				/>
			}
			label={label}
			labelPlacement={labelPlacement}
		/>
	);
}

export function RenderSelectFormHook({
	id,
	name,
	nameLabel,
	control,
	defaultValue,
	errors,
	helperText,
	customWidth = false,
	children,
	...rest
}) {
	return (
		<FormControl 
			style={{ width: customWidth ? (customWidth) : '100%' }} 
			error={Boolean(errors)}
			{...rest}
		>
			<InputLabel id={id + '-label'}>{nameLabel}</InputLabel>
			<Controller
				as={
					<Select labelId={id + '-label'} id={id}>
						{children}
					</Select>
				}
				name={name}
				control={control}
				defaultValue={defaultValue}
				rules={{ required: { value: true, message: '* Campo requerido' } }}
			/>
			<FormHelperText>{errors?.message ? errors?.message : helperText}</FormHelperText>
		</FormControl>
	);
}

export function RenderInputPassword(props) {
	const [visibility, setVisibility] = useState(false);

	const handleClick = () => {
		setVisibility(!visibility);
	};
	
	return (
		<TextField
			type={visibility ? 'text' : 'password'}
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={props?.size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
			{...props}
		/>
	);
}

export function NumberFormatInput(props) {
	const { defaultValue, rules, control, name, mask, ...other } = props;
	
	function NumberFormatMoney(props) {
		const { inputRef, onChange, ...other } = props;

		const MAX_VAL = 999999999999;
		const withValueLimit = (inputObj) => {
			const { value } = inputObj;
			if (value < MAX_VAL) return inputObj;
		};

		return (
			<NumberFormat
				{...other}
				getInputRef={inputRef}
				onValueChange={(values) => {
					onChange(values?.floatValue || 0);
				}}
				thousandSeparator='.'
				prefix={'Bs/S'}
				isAllowed={withValueLimit}
				decimalScale={2}
				decimalSeparator=','
				allowNegative={false}
			/>
		);
	}
	
	function NumberFormatPhone(props) {
		const { inputRef, onChange, ...other } = props;

		return (
			<NumberFormat
				{...other}
				getInputRef={inputRef}
				onValueChange={(values) => {
					onChange(values?.value || '');
				}}
				format="+## (###) ###-####"
				mask="-"
			/>
		);
	}
	
	const Formats = {
		'money': NumberFormatMoney,
		'phone': NumberFormatPhone,
	}
	
	return (
		<Controller
			as={
				<TextField
					{...other}
					InputProps={{
						inputComponent: Formats[mask],
					}}
				/>
			}
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
		/>
	);
}

export function AsyncInputFormHook(props) {
	const { label, name, control, rules, asyncRequest, getOptionLabel, renderOption = null, multiple = false, ...rest } = props;
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [hasFinish, setHasFinish] = useState(true);
	const loading = hasFinish && (open && options.length === 0);
	
	// Request to loading
	useEffect(() => {
		let cancel = false;
		
		const query = async () => {
			const result = await asyncRequest(inputValue);
			
			if (!cancel) {
				setOptions(result);
				setHasFinish(false);
			}
		}
		
		if (loading) {
			query();
		}
		
		return () => {
			cancel = true;
		}
	},[loading]);
	
	// Clear options
	useEffect(() => {
		if (!open) {
			setOptions([]);
			setHasFinish(true);
		}
	},[open]);
	
	
	const refreshResults = useCallback(
		useAsyncDebounce(() => {
			setOptions([]);
			setHasFinish(true);
		},500),
	[]);
	
	return (
		<Controller
			render={({onChange, onBlur, value, ref}) => (
				<Autocomplete
					multiple={multiple}
					getOptionLabel={getOptionLabel}
					options={options}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					value={value}
					onChange={(e, newValue) => {
						onChange(newValue);
					}}
					inputValue={inputValue}
					onInputChange={(e, newValue) => {
						setInputValue(newValue);
						refreshResults();
					}}
					onBlur={onBlur}
					loading={loading}
					loadingText='Cargando...'
					noOptionsText='No hay resultados'
					renderOption={renderOption}
					renderInput={(params) => (
						<TextField
							{...params}
							{...rest}
							inputRef={ref}
							label={label}
							variant='outlined'
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? <CircularProgress color='inherit' size={20} /> : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								)
							}}
						/>
					)}
				/>
			)}
			name={name}
			control={control}
			rules={rules}
		/>
	);
}

function MarkdownTable(props) {
	const classes = useStyles();
	
	return (
		<TableContainer component={Paper} className={classes.separer}>
			<Table size="small" aria-label="a dense table">{props.children}</Table>
		</TableContainer>
	);
}

function MarkdownTableCell(props) {
    return <TableCell>{props.children}</TableCell>
}

function MarkdownTableRow(props) {
    return <TableRow>{props.children}</TableRow>
}

function MarkdownTableBody(props) {
    return <TableBody>{props.children}</TableBody>
}

function MarkdownTableHead(props) {
    return <TableHead>{props.children}</TableHead>
}

const MarkdownListItem = ({ ...props }) => {
	return (
		<li>
			<Typography component="span">{props.children}</Typography>
		</li>
	);
};

function MarkdownParagraph(props) {
	const classes = useStyles();
	
	return <Typography className={classes.separer}>{props.children}</Typography>
}

function MarkdownLink(props) {
	return <Link target='_blank' href={props.href}>{props.children}</Link>
}

const MarkdownHeading = ({ ...props }) => {
	let variant;
	switch (props.level) {
		case 1:
				variant = "h5";
				break;
		case 2:
				variant = "h6";
				break;
		case 3:
				variant = "subtitle1";
				break;
		case 4:
				variant = "subtitle2";
				break;
		default:
				variant = "h6";
				break;
	}
	return (
		<Typography
			gutterBottom
			variant={variant}
		>
			{props.children}
		</Typography>
	);
}

export const renderersMarkdown = {
	heading: MarkdownHeading,
	link: MarkdownLink,
	paragraph: MarkdownParagraph,
	table: MarkdownTable,
	tableHead: MarkdownTableHead,
	tableBody: MarkdownTableBody,
	tableRow: MarkdownTableRow,
	tableCell: MarkdownTableCell,
	listItem: MarkdownListItem,
};
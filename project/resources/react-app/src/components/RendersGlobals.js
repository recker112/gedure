import React, { useState } from 'react';

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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
	separer: {
		marginBottom: theme.spacing(2)
	},
}));

export function RenderSwitchFormHook(props) {
	const { name, defaultValue, control, label, ...rest } = props;
	
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
import React, { useState } from 'react';

//Material-UI
import {
	TextField,
	InputAdornment,
	IconButton,
	FormControl,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export function RenderRadios({ registerInput, data, defaultValue=null }) {
	return (
		<FormControl component="fieldset">
			<FormLabel color={data.color} component="legend">
				{data.title}
			</FormLabel>
			<RadioGroup defaultValue={defaultValue} aria-label={data.name} name={data.name} row>
				{data.values.map((element, i) => {
					return (
						<FormControlLabel
							key={i}
							value={element.value}
							inputRef={registerInput}
							control={<Radio  color={data.color} />}
							label={element.name}
							labelPlacement="end"
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}

export function RenderInput(props) {
	const {
		type = 'text',
		name,
		registerInput,
		errors,
		defaultValue,
		label,
		variant = 'outlined',
		textarea = false,
		maxRows = 6,
		maxWidth = false,
		size = 'medium',
		passwordMode = false,
		focus = false,
		disabledOnLoading = null,
	} = props;

	const [visibility, setVisibility] = useState(false);

	const handleClick = () => {
		setVisibility(!visibility);
	};

	const textareaConfig = {
		rows: 4,
		rowsMax: maxRows,
	};
	return (
		<TextField
			inputRef={registerInput}
			type={passwordMode ? (visibility ? 'text' : 'password') : type}
			name={name}
			defaultValue={defaultValue}
			label={label}
			size={size}
			disabled={disabledOnLoading !== null && disabledOnLoading}
			error={Boolean(errors)}
			helperText={errors?.message}
			autoFocus={focus}
			style={{ width: '100%', maxWidth: maxWidth ? maxWidth : 'none' }}
			variant={variant}
			multiline={textarea}
			InputProps={{
				endAdornment: passwordMode ? (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				) : null,
			}}
			{...textareaConfig}
		/>
	);
}
import React, { useState } from 'react';

//Material-UI
import {
	TextField,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export function RenderInputPassword(props) {
	const {
		name,
		registerInput,
		error,
		defaultValue,
		label,
		helperText,
		variant = 'outlined',
		maxWidth = false,
		size = 'medium',
		autoFocus = false,
		disabled = false,
	} = props;

	const [visibility, setVisibility] = useState(false);

	const handleClick = () => {
		setVisibility(!visibility);
	};
	return (
		<TextField
			inputRef={registerInput}
			type={visibility ? 'text' : 'password'}
			name={name}
			defaultValue={defaultValue}
			label={label}
			size={size}
			disabled={disabled}
			error={Boolean(error)}
			helperText={helperText}
			style={{ maxWidth: maxWidth ? maxWidth : 'none' }}
			fullWidth
			autoFocus={autoFocus}
			variant={variant}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={size}>
							{visibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
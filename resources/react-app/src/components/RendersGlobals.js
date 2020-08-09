import React, { useState } from 'react';

//Material-UI
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export function RenderInput(props) {
	const {
		type='text',
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
							{visibility ?  <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				) : null,
			}}
			{...textareaConfig}
		/>
	);
}
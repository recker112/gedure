import React, { useState } from 'react';

// MUI
import { IconButton, InputAdornment, TextField } from "@mui/material";
// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// FormHook
import { useController } from "react-hook-form";

export function InputPasswordHook(props) {
	const { 
		name, 
		control,
		rules = null, 
		defaultValue = '',
		helperText = '',
		...rest
	} = props;
  const [visibility, setVisibility] = useState(false);

	const {
    field: { ref, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	const handleClick = () => {
		setVisibility(!visibility);
	};

	return (
		<TextField
			inputRef={ref}
			{...inputProps}
			{...rest}
			error={invalid}
			helperText={error ? error.message : helperText}
      type={visibility ? 'text' : 'password'}
      InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} size={rest?.size}>
							{visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
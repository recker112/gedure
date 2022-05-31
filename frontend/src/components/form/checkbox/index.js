import React from 'react';

import {
	Checkbox,
	FormControlLabel,
} from '@mui/material';

import { useController } from "react-hook-form";

export function CheckboxHook({ control, name, label, labelPlacement='end', defaultValue = false, ...rest }) {
	const {
    field: { ref, onChange, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });
	
	return (
		<FormControlLabel
			control={
				<Checkbox
					{...inputProps}
					{...rest}
					onChange={e => {
						onChange(e.target.checked)
					}}
					inputRef={ref}
				/>
			}
			label={label}
			labelPlacement={labelPlacement}
		/>
	);
}
import React from 'react';

import {
	Checkbox,
	FormControlLabel,
} from '@material-ui/core';

import { useController } from "react-hook-form";

export function CheckboxHook(props) {
	const { control, name, label, labelPlacement='end', defaultValue = false, ...rest } = props;
	
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
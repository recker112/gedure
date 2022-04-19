import React from 'react';

import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';

import { useController } from "react-hook-form";

export function RadioHook(props) {
	const { 
		disabled, 
		label, 
		name, 
		control, 
		defaultValue, 
		row,
		radioList,
		rules = { required: '* Campo requerido' }, 
	} = props;
	
	const {
    field: { ...inputProps },
		fieldState: { invalid }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	return (
		<FormControl error={invalid} component="fieldset" disabled={disabled}>
			<FormLabel component="legend">{label}</FormLabel>
			<RadioGroup 
				{...inputProps}
				aria-label={label}
				row={row}
			>
				{radioList.map((radio, i) => (
					<FormControlLabel 
						key={i}
						value={radio.value} 
						control={
							<Radio />
						} 
						label={radio.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

import NumberFormat from 'react-number-format';

export function InputMaskHook({ 
	name, 
	control,
	rules = null,
	defaultValue = '',
	helperText = '',
	...rest 
}) {
	const {
    field: { ref, onChange, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	return (
		<NumberFormat 
			{...inputProps}
			{...rest}
			customInput={TextField}
			error={invalid}
			onValueChange={(values) => {
				onChange(values?.value || '');
			}}
			helperText={error ? error.message : helperText}
			mask='_'
		/>
	);
}
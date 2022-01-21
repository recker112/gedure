import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

import NumberFormat from 'react-number-format';

export function InputMaskHook(props) {
	const { 
		name, 
		control,
		rules = null,
		defaultValue = '',
		helperText = '',
		...rest 
	} = props;
	
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
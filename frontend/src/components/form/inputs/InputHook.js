import { TextField } from "@mui/material";

import { useController } from "react-hook-form";

export function InputHook({ 
	name, 
	control,
	rules = null, 
	defaultValue = '',
	helperText = '',
	...rest
}) {
	const {
    field: { ref, ...inputProps },
		fieldState: { invalid, error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });
	
	
	return (
		<TextField
			inputRef={ref}
			{...inputProps}
			{...rest}
			error={invalid}
			helperText={error ? error.message : helperText}
		/>
	);
}
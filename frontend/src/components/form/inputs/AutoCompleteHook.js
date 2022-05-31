import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { useController } from 'react-hook-form';

export function AutoCompleteHook({
  multiple,
  options,
  name,
  control,
  defaultValue,
  rules = { required: '* Campo requerido' },
  isOptionEqualToValue,
  getOptionLabel,
  helperText,
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
    <Autocomplete
			{...inputProps}
			onChange={(e, newValue) => {
				onChange(newValue);
			}}
			multiple={multiple}
			options={options}
			noOptionsText='No hay resultados'
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
			renderInput={(params) => (
				<TextField
					{...params}
					{...rest}
					inputRef={ref}
					error={invalid}
					helperText={error ? error.message : helperText}
				/>
			)}
		/>
  )
}

import React, { useEffect, useState, useCallback } from 'react'

// MUI
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

// Form
import { useController } from "react-hook-form";
import useAsyncDebounce from '../../../hooks/useAsyncDebounce';

export function AutoCompleteAsyncHook({
  name,
  control,
  rules = null, 
  data = [],
	defaultValue = '',
  helperText = '',
  getOptionLabel,
  isOptionEqualToValue,
  multiple,
  handleRequest,
  disabled,
  renderOption,
  renderTags,
  limitTags,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [hasFinish, setHasFinish] = useState(true);
  const loading = hasFinish && (open && options.length === 0);

  const {
    field: { ref, onChange, ...inputProps },
		fieldState: { error }
  } = useController({
    name,
    control,
		rules,
    defaultValue,
  });

  // NOTA(RECKER): Core request
  useEffect(() => {
    let active = true;

    const request = async () => {
      await handleRequest(inputValue);
    }

    if (!loading) {
      return undefined;
    }

    if (active) {
      request();
    }

    return () => {
      active = false;
    };

    // eslint-disable-next-line
  }, [loading]);


  // NOTA(RECKER): Reset
  useEffect(() => {
    if (!open) {
      setOptions([]);
      setHasFinish(true);
    }

    // eslint-disable-next-line
  }, [open]);

  // NOTA(RECKER): Actualizar options
  useEffect(() => {
    if (data !== null) {
      setOptions(data);
      setHasFinish(false);
    }
  }, [data]);

  // NOTA(REKCER): Refresh data
  // eslint-disable-next-line
	const refreshResults = useCallback(
		useAsyncDebounce(() => {
      setOptions([]);
      setHasFinish(true);
		},500),
	[]);

  return (
    <Autocomplete
      multiple={multiple}
      id={`autocomplete-${name}`}
      options={options}
      open={open}
      onOpen={() => {
				setOpen(true);
        setHasFinish(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
      onChange={(e,value) => {
        onChange(value);
      }}
      inputValue={inputValue}
      onInputChange={(e, newValue) => {
				setInputValue(newValue);
        if (e?.type === 'change') {
          refreshResults();
        }
			}}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={loading}
      loadingText='Cargando...'
			noOptionsText='No hay resultados'
      renderTags={renderTags}
      disabled={disabled}
      renderOption={renderOption}
      limitTags={limitTags}
      renderInput={(params) => (
        <TextField 
          {...params}
          {...inputProps}
          {...rest}
          inputRef={ref}
          error={Boolean(error)}
          helperText={error ? error.message : helperText}
          InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color='inherit' size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						)
					}}
        />
      )}
    />
  )
}

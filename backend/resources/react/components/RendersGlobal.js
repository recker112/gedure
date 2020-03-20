//React
import React, { useState } from 'react';

//Material-UI
import {
  TextField,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export function RenderSelect({ val, action, data, error = false, empty = true, classNameSet = false, customWidth = false }) {
  return (
    <FormControl error={error && error.status} style={{ width: customWidth ? (customWidth) : '100%' }}>
      <Select
        displayEmpty
        name={data.name}
        value={val}
        onChange={action}
        className={classNameSet ? (classNameSet) : null}
      >
        {data.values.map((element, i) => {
          if (i === 0 && empty) {
            return (
              <MenuItem key={i} value={element.value}>
                <em>{element.name}</em>
              </MenuItem>
            );
          } else {
            return <MenuItem key={i} value={element.value}>{element.name}</MenuItem>;
          }
        })}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

export function RenderRadios({ val, accion, data }) {
  return (
    <FormControl component="fieldset">
      <FormLabel color={data.color} component="legend">
        {data.title}
      </FormLabel>
      <RadioGroup aria-label={data.name} name={data.name} value={val} onChange={accion} row>
        {data.values.map((element, i) => {
          return (
            <FormControlLabel
              key={i}
              value={element.value}
              control={<Radio color={data.color} />}
              label={element.name}
              labelPlacement="end"
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export function RenderInputs({ data, accion, error, variant="outlined", textarea=false, maxWidth = false, size = 'medium', visibleToggle = false, focus = false }) {
  const { val, name, label } = data;
  const { status, message } = error;
  
  const [visibility, setVisibility] = useState(false);

  const handleClick = () => {
    setVisibility(!visibility);
  }

  const textareaConfig = {
    rows: 4,
    rowsMax: 6,
  }
  return (
    <TextField
      type={visibleToggle ? visibility ? "text": "password" : "text"}
      name={name}
      value={val}
      label={label}
      size={size}
      autoFocus={focus}
      style={{ width: '100%', maxWidth: maxWidth ? maxWidth : "none"}}
      variant={variant}
      onChange={accion}
      multiline={textarea}
      InputProps={{
        endAdornment: visibleToggle ? 
        (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} size={size}>
              {visibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
        :
        null
      }}
      {...textareaConfig}
      error={status}
      helperText={status && message}
    />
  );
}
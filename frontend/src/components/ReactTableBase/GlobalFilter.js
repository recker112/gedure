import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { useAsyncDebounce } from "react-table";

export function GlobalFilter({ state, setGlobalFilter, gotoPage, dataTourGlobal }) {
  const [value, setValue] = useState(state.globalFilter);

  const onDebounce = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    gotoPage(0);
  }, 500);

  const handleClear = () => {
    setValue("");
    setGlobalFilter(undefined);
    gotoPage(0);
  }

  return (
    <TextField
      data-tour={dataTourGlobal}
      size="small"
      value={value || ""}
      placeholder="Buscar..."
      variant='standard'
      onChange={(event) => {
        onDebounce(event.target.value);
        setValue(event.target.value);
      }}
      sx={{
        mr: 1,
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        endAdornment: <IconButton disabled={!value} onClick={handleClear}><ClearIcon /></IconButton>
      }} />
  );
}

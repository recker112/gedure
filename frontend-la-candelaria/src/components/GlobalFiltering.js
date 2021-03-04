import React, { useState } from 'react';

import { useAsyncDebounce } from 'react-table';

import {
	TextField,
	InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export function Searching({ filter, setFilter }) {
	const [value, setValue] = useState(filter || '');
	
	const onAsync = useAsyncDebounce((value) => {
		setFilter(value || undefined);
	}, 1000);
	
	const onChange = (e) => {
		setValue(e.target.value);
		onAsync(e.target.value);
	}
	
	return(
		<TextField 
			name='search'
			placeholder='Buscar'
			value={value}
			onChange={onChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
}
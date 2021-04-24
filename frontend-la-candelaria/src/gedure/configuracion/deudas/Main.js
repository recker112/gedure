import React, { useRef } from 'react';

import { 
	Grid,
} from '@material-ui/core';

// Components
import CreateBankAccount from './CreateBankAccount';

export default function Main() {
	const tableRefBankAccount = useRef(null);
	
	return (
		<Grid container spacing={2}>
			<CreateBankAccount tableRef={tableRefBankAccount} />
		</Grid>
	);
}
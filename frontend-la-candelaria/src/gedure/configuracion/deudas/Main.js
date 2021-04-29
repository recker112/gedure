import React, { useRef } from 'react';

import { 
	Grid,
} from '@material-ui/core';

// Components
import CreateBankAccount from './CreateBankAccount';
import TableBankAccount from './TableBankAccount';
import EditBankAccount from './EditBankAccount';
import DeleteBankAccount from './DeleteBankAccount';

export default function Main() {
	const tableRefBankAccount = useRef(null);
	
	return (
		<Grid container spacing={2}>
			<CreateBankAccount tableRef={tableRefBankAccount} />
			<TableBankAccount tableRef={tableRefBankAccount} />
			<EditBankAccount tableRef={tableRefBankAccount} />
			<DeleteBankAccount tableRef={tableRefBankAccount} />
		</Grid>
	);
}
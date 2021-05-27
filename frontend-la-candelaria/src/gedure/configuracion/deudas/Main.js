import React, { useRef } from 'react';

import { 
	Grid,
} from '@material-ui/core';

// Components
// Bank Account
import CreateBankAccount from './CreateBankAccount';
import TableBankAccount from './TableBankAccount';
import EditBankAccount from './EditBankAccount';
import DeleteBankAccount from './DeleteBankAccount';
// Bank Transaction
import UploadBankTransaction from './UploadBankTransaction';
import TableBankTransaction from './TableBankTransaction';
import DeleteBankTransaction from './DeleteBankTransaction';

// Redux
import { useSelector } from 'react-redux';

export default function Main() {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	
	const tableRefBankAccount = useRef(null);
	const tableRefBankTransaction = useRef(null);
	
	return (
		<Grid container spacing={2}>
			{permissions?.gedure?.bank_account_create && (
				<CreateBankAccount tableRef={tableRefBankAccount} />
			)}
			{permissions?.gedure?.bank_account_index && (
				<React.Fragment>
					<TableBankAccount tableRef={tableRefBankAccount} />
					<EditBankAccount tableRef={tableRefBankAccount} />
					<DeleteBankAccount tableRef={tableRefBankAccount} />
				</React.Fragment>
			)}
			{permissions?.gedure?.bank_transaction_upload && (
				<UploadBankTransaction tableRef={tableRefBankTransaction} />
			)}
			{permissions?.gedure?.bank_transaction_index && (
				<React.Fragment>
					<TableBankTransaction tableRef={tableRefBankTransaction} />
					<DeleteBankTransaction tableRef={tableRefBankTransaction} />
				</React.Fragment>
			)}
		</Grid>
	);
}
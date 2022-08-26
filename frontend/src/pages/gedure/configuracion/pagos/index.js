import React from 'react'

// MUI
import { Grid } from '@mui/material';

// Components
import TourPagos from '../TourPagos';
import CreateBankAccount from './CreateBankAccount';
import TableAccounts from './TableAccounts';
import DialogConfirmation from '../../../../components/DialogConfirmation';
import { parseToAccountString } from '../../../../components/Utils/ParseString';
import EditBankAccount from './EditBankAccount';
import UploadTransactions from './UploadTransactions';
import TableTransactions from './TableTransactions';
import AssignTransaction from './AssignTransaction';

// Redux
import { useSelector } from 'react-redux';
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { deleteBankAccount } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/deleteBankAccount';
import { deleteBankTransaction } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/deleteBankTransaction';
import { deleteMassiveBankAccount } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/deleteMassiveBankAccount';
import { deleteMassiveBankTransaction } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/deleteMassiveBankTransaction';

export default function GDPagos() {
  const { gedure } = useSelector((state) => ({
		gedure: state.auth.permissions.gedure,
	}));

  return (
    <Grid container spacing={2} sx={{paddingBottom: 6}}>
      {gedure.bank_account_create && (
        <Grid item xs={12}>
          <CreateBankAccount />
        </Grid>
      )}
      {gedure.bank_account_index && (
        <Grid item xs={12}>
          <TableAccounts />
          <EditBankAccount />
          <DialogConfirmation
            rdx1='requestStatus' 
            rdx2='deleteBankAccount'
            close={
              setRequestStatus({open: false, data: {}, select: 'deleteBankAccount'})
            }
            request={
              data => deleteBankAccount(data.id)
            }
          >
            {(data) => (<span>Está a punto de <strong>eliminar</strong> la cuenta <strong>{parseToAccountString(data?.n_account || '')}</strong>. Al realizarse esta acción todas las <strong>transacciones bancarias</strong> registradas de la misma <strong>serán borradas</strong>, pero las <strong>transacciones internas</strong> realizadas dentro del sistema <strong>no se verán afectadas</strong>. Tenga en cuenta que esta acción no se puede deshacer.</span>)}
          </DialogConfirmation>
          <DialogConfirmation
            rdx1='requestStatus' 
            rdx2='deleteBankAccountMassive'
            close={
              setRequestStatus({open: false, data: {}, select: 'deleteBankAccountMassive'})
            }
            request={
              data => deleteMassiveBankAccount(data)
            }
          >
            {(data) => (<span>Está a punto de <strong>eliminar</strong> <strong>{data?.length}</strong> cuenta(s). Al realizarse esta acción todas las <strong>transacciones bancarias</strong> registradas de la misma <strong>serán borradas</strong>, pero las <strong>transacciones internas</strong> realizadas dentro del sistema <strong>no se verán afectadas</strong>. Tenga en cuenta que esta acción no se puede deshacer.</span>)}
          </DialogConfirmation>
        </Grid>
      )}
      {gedure.bank_transaction_upload && (
        <Grid item xs={12}>
          <UploadTransactions />
        </Grid>
      )}
      {gedure.bank_transaction_index && (
        <Grid item xs={12}>
          <TableTransactions />
          <AssignTransaction />
          <DialogConfirmation
            rdx1='requestStatus' 
            rdx2='deleteTransaction'
            close={
              setRequestStatus({open: false, data: {}, select: 'deleteTransaction'})
            }
            request={
              data => deleteBankTransaction(data.id)
            }
          >
            {(data) => (<span>Está a punto de eliminar la transacción <strong>#{data.id}</strong>, tenga en cuenta que esta acción no se puede deshacer.</span>)}
          </DialogConfirmation>
          <DialogConfirmation
            rdx1='requestStatus' 
            rdx2='deleteMassiveBankTransaction'
            close={
              setRequestStatus({open: false, data: {}, select: 'deleteMassiveBankTransaction'})
            }
            request={
              data => deleteMassiveBankTransaction(data)
            }
          >
            {(data) => (<span>Está a punto de <strong>eliminar {data?.length}</strong> transaccione(s), tenga en cuenta que esta acción no se puede deshacer.</span>)}
          </DialogConfirmation>
        </Grid>
      )}
      <TourPagos />
    </Grid>
  )
}

import React from 'react'

// MUI
import { Grid } from '@mui/material';

// Components
import CreateBankAccount from './CreateBankAccount';
import TableAccounts from './TableAccounts';
import DialogConfirmation from '../../../../components/DialogConfirmation';
import { parseToAccountString } from '../../../../components/Utils/ParseString';
import EditBankAccount from './EditBankAccount';
import UploadTransactions from './UploadTransactions';
import TableTransactions from './TableTransactions';

// Redux
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { deleteBankAccount } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/deleteBankAccount';

export default function GDPagos() {
  return (
    <Grid container spacing={2} sx={{paddingBottom: 6}}>
      <Grid item xs={12}>
        <CreateBankAccount />
      </Grid>
      <Grid item xs={12}>
        <TableAccounts />
      </Grid>
      <Grid item xs={12}>
        <UploadTransactions />
      </Grid>
      <Grid item xs={12}>
        <TableTransactions />
      </Grid>
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
          data => deleteBankAccount(data)
        }
      >
        {(data) => (<span>Está a punto de <strong>eliminar</strong> <strong>{data.ids?.length}</strong> cuenta(s). Al realizarse esta acción todas las <strong>transacciones bancarias</strong> registradas de la misma <strong>serán borradas</strong>, pero las <strong>transacciones internas</strong> realizadas dentro del sistema <strong>no se verán afectadas</strong>. Tenga en cuenta que esta acción no se puede deshacer.</span>)}
      </DialogConfirmation>
    </Grid>
  )
}

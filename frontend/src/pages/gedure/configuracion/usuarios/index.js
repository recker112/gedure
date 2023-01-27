import React from 'react'

// MUI
import { Grid } from '@mui/material';

// Components
import DonwloadData from './DonwloadData';
import TourDisabled from '../TourDisabled';
import Table from './Table';
import DialogConfirmation from '../../../../components/DialogConfirmation';

// Redux
import { useSelector } from 'react-redux';
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { restoreUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users/restoreUser';
import { restoreMassiveUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users/restoreMassiveUsers';
import { destroyUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users/destroyUser';
import { destroyMassiveUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users/destroyMassiveUser';

export default function GDUser() {
  const { gedure } = useSelector((state) => ({
		gedure: state.auth.permissions.gedure,
	}));

  return (
    <Grid container spacing={2} sx={{paddingBottom: 6}}>
      {gedure.users_download_data && (
        <Grid item xs={12}>
          <DonwloadData />
        </Grid>
      )}
      {gedure.users_disabled_index && (
        <>
          <Grid item xs={12}>
            <Table />
          </Grid>
          <DialogConfirmation
          rdx1='requestStatus' 
          rdx2='restoreUser'
          close={
            setRequestStatus({open: false, data: {}, select: 'restoreUser'})
          }
          request={
            data => restoreUser(data)
          }
        >
          {(data) => (<span>Está a punto de restaurar al usuario <strong>{`${data.privilegio}${data.username}`}</strong>. Tenga en cuenta que si reactiva a un estudiante no se asignará a ningún curso.</span>)}
        </DialogConfirmation>
        <DialogConfirmation
          rdx1='requestStatus' 
          rdx2='restoreMassiveUser'
          close={
            setRequestStatus({open: false, data: {}, select: 'restoreMassiveUser'})
          }
          request={
            data => restoreMassiveUser(data)
          }
        >
          {(data) => (<span>Está a punto de restaurar <strong>{data?.length}</strong> usuario(s). Tenga en cuenta que si reactiva a un estudiante no se asignará a ningún curso.</span>)}
        </DialogConfirmation>
        <DialogConfirmation
          rdx1='requestStatus' 
          rdx2='destroyUser'
          close={
            setRequestStatus({open: false, data: {}, select: 'destroyUser'})
          }
          request={
            data => destroyUser(data)
          }
        >
          {(data) => (<span>Está a punto de eliminar permanentemente al usuario <strong>{`${data.privilegio}${data.username}`}</strong>. Esta acción es irreversible, una vez fuera del sistema no podrá recuperar los datos.</span>)}
        </DialogConfirmation>
        <DialogConfirmation
          rdx1='requestStatus' 
          rdx2='destroyMassiveUser'
          close={
            setRequestStatus({open: false, data: {}, select: 'destroyMassiveUser'})
          }
          request={
            data => destroyMassiveUser(data)
          }
        >
          {(data) => (<span>Está a punto de eliminar permanentemente <strong>{data?.length}</strong> usuario(s). Esta acción es irreversible, una vez fuera del sistema no podrá recuperar los datos.</span>)}
        </DialogConfirmation>
        </>
      )}
      <TourDisabled />
    </Grid>
  )
}

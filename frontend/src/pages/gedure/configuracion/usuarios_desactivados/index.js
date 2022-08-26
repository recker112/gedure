import React from 'react'

// MUI
import { Box } from '@mui/material';

// Components
import TourDisabled from '../TourDisabled';
import Table from './Table';
import DialogConfirmation from '../../../../components/DialogConfirmation';

// Redux
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { restoreUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users_disabled/restoreUser';
import { restoreMassiveUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users_disabled/restoreMassiveUsers';
import { destroyUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users_disabled/destroyUser';
import { destroyMassiveUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users_disabled/destroyMassiveUser';

export default function GDUserDis() {
  return (
    <Box sx={{paddingBottom: 6}}>
      <Table />
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
      <TourDisabled />
    </Box>
  )
}

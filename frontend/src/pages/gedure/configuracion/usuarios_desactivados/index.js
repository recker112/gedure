import React from 'react'

// Components
import Table from './Table';
import DialogConfirmation from '../../../../components/DialogConfirmation';

// Redux
import { destroyUser, destroyUserMassive, restoreUser, restoreUserMassive, setConfirmConfgsGCDU } from '../../../../store/slices/gedure/configuracion/user_disabled/confirm';

export default function GDUserDis() {
  return (
    <>
      <Table />
      <DialogConfirmation
        rdx1='gdGCDUConfirm' 
        rdx2='restore'
        close={
          setConfirmConfgsGCDU({open: false, data: {}, confirm: 'restore'})
        }
        request={
          data => restoreUser(data)
        }
      >
        {(data) => (<span>Está a punto de restaurar al usuario <strong>{data.privilegio+data.username}</strong>. Tenga en cuenta que si reactiva a un estudiante no se asignará a ningún curso.</span>)}
      </DialogConfirmation>
      <DialogConfirmation
        rdx1='gdGCDUConfirm' 
        rdx2='restoreMassive'
        close={
          setConfirmConfgsGCDU({open: false, data: {}, confirm: 'restoreMassive'})
        }
        request={
          data => restoreUserMassive(data)
        }
      >
        {(data) => (<span>Está a punto de restaurar <strong>{data?.length}</strong> usuario(s). Tenga en cuenta que si reactiva a un estudiante no se asignará a ningún curso.</span>)}
      </DialogConfirmation>
      <DialogConfirmation
        rdx1='gdGCDUConfirm' 
        rdx2='destroy'
        close={
          setConfirmConfgsGCDU({open: false, data: {}, confirm: 'destroy'})
        }
        request={
          data => destroyUser(data)
        }
      >
        {(data) => (<span>Está a punto de eliminar permanentemente al usuario <strong>{data.privilegio+data.username}</strong>. Esta acción es irreversible, una vez fuera del sistema no podrá recuperar los datos.</span>)}
      </DialogConfirmation>
      <DialogConfirmation
        rdx1='gdGCDUConfirm' 
        rdx2='destroyMassive'
        close={
          setConfirmConfgsGCDU({open: false, data: {}, confirm: 'destroyMassive'})
        }
        request={
          data => destroyUserMassive(data)
        }
      >
        {(data) => (<span>Está a punto de eliminar permanentemente <strong>{data?.length}</strong> usuario(s). Esta acción es irreversible, una vez fuera del sistema no podrá recuperar los datos.</span>)}
      </DialogConfirmation>
    </>
  )
}

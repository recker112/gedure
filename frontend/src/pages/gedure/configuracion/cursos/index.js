import React from 'react';

// MUI
import { Grid } from '@mui/material';

// Components
import CreateCurso from './CreateCurso';
import Table from './Table';
import DialogConfirmation from '../../../../components/DialogConfirmation';

// Redux
import { useSelector } from 'react-redux';
import { deleteCurso, deleteCursoMassive, setConfirmConfgsGC } from '../../../../store/slices/gedure/configuracion/cursos/confirm';

export default function GDCursos() {
  const { cursos_create } = useSelector(state => state.auth.permissions.gedure);

  return (
    <Grid container spacing={2} sx={{paddingBottom: 6}}>
      {cursos_create && (
        <Grid item xs={12}>
          <CreateCurso />
        </Grid>
      )}
      <Grid item xs={12}>
        <Table />
      </Grid>
      <DialogConfirmation
        rdx1='gdGCConfirm' 
        rdx2='delete'
        close={
          setConfirmConfgsGC({open: false, data: {}, confirm: 'delete'})
        }
        request={
          data => deleteCurso(data)
        }
      >
        {(data) => (<span>Está a punto de eliminar el curso <strong>{data.code}</strong>. Las boletas de esta sección serán eliminadas por completo, pero los estudiantes se mantendrán activos.</span>)}
      </DialogConfirmation>

      <DialogConfirmation
        rdx1='gdGCConfirm' 
        rdx2='deleteMassive'
        close={
          setConfirmConfgsGC({open: false, data: {}, confirm: 'deleteMassive'})
        }
        request={
          data => deleteCursoMassive(data)
        }
      >
        {(data) => (<span>Está a punto de eliminar <strong>{data?.length}</strong> cursos. Las boletas de esta sección serán eliminadas por completo, pero los estudiantes se mantendrán activos.</span>)}
      </DialogConfirmation>
    </Grid>
  )
}

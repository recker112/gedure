import React from 'react';

// MUI
import { Grid } from '@mui/material';

// Components
import TourCursos from '../TourCursos';
import CreateCurso from './CreateCurso';
import Table from './Table';
import DialogConfirmation from '../../../../components/DialogConfirmation';

// Redux
import { useSelector } from 'react-redux';
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { deleteCurso } from '../../../../store/slices/requestStatus/async_trunk/configuracion/cursos/deleteCurso';
import { deleteMassiveCursos } from '../../../../store/slices/requestStatus/async_trunk/configuracion/cursos/deleteMassiveCursos';

export default function GDCursos() {
  const { cursos_create } = useSelector(state => state.auth.permissions.gedure);

  return (
    <Grid container spacing={2} sx={{paddingBottom: 6}}>
      {cursos_create && (
        <Grid item xs={12} data-tour="create-curso">
          <CreateCurso />
        </Grid>
      )}
      <Grid item xs={12} data-tour="cursos">
        <Table />
      </Grid>
      <DialogConfirmation
        rdx1='requestStatus' 
        rdx2='deleteCurso'
        close={
          setRequestStatus({open: false, data: {}, select: 'deleteCurso'})
        }
        request={
          data => deleteCurso(data)
        }
      >
        {(data) => (<span>Está a punto de eliminar el curso <strong>{data.code}</strong>. Las boletas de esta sección serán eliminadas por completo, pero los estudiantes se mantendrán activos.</span>)}
      </DialogConfirmation>

      <DialogConfirmation
        rdx1='requestStatus' 
        rdx2='deleteMassiveCursos'
        close={
          setRequestStatus({open: false, data: {}, select: 'deleteMassiveCursos'})
        }
        request={
          data => deleteMassiveCursos(data)
        }
      >
        {(data) => (<span>Está a punto de eliminar <strong>{data?.length}</strong> cursos. Las boletas de esta sección serán eliminadas por completo, pero los estudiantes se mantendrán activos.</span>)}
      </DialogConfirmation>
      <TourCursos />
    </Grid>
  )
}

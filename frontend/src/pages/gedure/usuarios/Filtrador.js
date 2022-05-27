import React from 'react'

// MUI
import { AppBar, Badge, Box, Container, Drawer, Grid, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Form
import { useForm } from "react-hook-form";
import { CursosList, SeccionList } from '../../../components/Utils/StudiendsLists';
import { RadioHook } from '../../../components/form/radio';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFilterBox, setFilters } from '../../../store/slices/gedure/usuarios/table';

export default function Filtrador() {
  const { filterBox, filters, countFilters } = useSelector(state => state.gdUTable);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: filters,
  });

  const handleOpen = () => {
    dispatch(setFilterBox(true));
  }

  const onClose = async data => {
    if (data.type !== 'V-') {
      data.curso = '';
      data.seccion = '';
      setValue('curso', '');
      setValue('seccion', '');
    }

    await dispatch(setFilters(data));
    dispatch(setFilterBox(false));
  }

  const handleReset = () => {
    reset({
      type: '',
      curso: '',
      seccion: '',
    });
  }

  const listCursos = [
    {
      value: '',
      label: 'Todos'
    },
    ...CursosList
  ];

  const listSeccion = [
    {
      value: '',
      label: 'Todos'
    },
    ...SeccionList
  ];

  return (
    <>
      <Badge badgeContent={countFilters} color="primary">
        <Tooltip title='Filtrador' arrow>
          <IconButton color='inherit' onClick={handleOpen}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Badge>

      <Drawer
        open={filterBox}
        anchor='bottom'
      >
        <Paper sx={{height: '100vh'}}>
          <AppBar 
            enableColorOnDark
            position='static'
            elevation={0}
          >
            <Toolbar>
              <Typography variant='h5' sx={{flexGrow: 1}}>Filtrador</Typography>
              <Tooltip title='Reiniciar' arrow>
                <IconButton onClick={handleReset}>
                  <RestartAltIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Cerrar' arrow>
                <IconButton onClick={handleSubmit(onClose)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Container>
            <Box my={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RadioHook 
                    label='Tipo de cuenta'
                    name='type'
                    defaultValue={filters.type}
                    row
                    radioList={[
                      {
                        value: '',
                        label: 'Todos'
                      },
                      {
                        value: 'A-',
                        label: 'Administradores'
                      },
                      {
                        value: 'V-',
                        label: 'Estudiantes'
                      },
                      {
                        value: 'V-NA',
                        label: 'Estudiantes sin curso'
                      }
                    ]}
                    rules={{}}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioHook 
                    label='Curso'
                    name='curso'
                    defaultValue={filters.curso}
                    disabled={watch('type') !== 'V-'}
                    radioList={listCursos}
                    rules={{}}
                    control={control}
                    row
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioHook 
                    label='Sección'
                    name='seccion'
                    defaultValue={filters.seccion}
                    disabled={watch('type') !== 'V-'}
                    radioList={listSeccion}
                    rules={{}}
                    control={control}
                    row
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Paper>
      </Drawer>
    </>
  )
}

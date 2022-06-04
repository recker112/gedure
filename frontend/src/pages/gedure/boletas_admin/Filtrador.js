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
import { setFilterBoxBT, setFiltersBT } from '../../../store/slices/gedure/boletas_admin/table';

export default function Filtrador() {
  const { filterBox, filters, countFilters } = useSelector(state => state.gdBTable);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });

  const handleOpen = () => {
    dispatch(setFilterBoxBT(true));
  }

  const onClose = async data => {
    await dispatch(setFiltersBT(data));
    dispatch(setFilterBoxBT(false));
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
                    label='Curso'
                    name='curso'
                    defaultValue={filters.curso}
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

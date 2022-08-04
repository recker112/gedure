import React from 'react'

// MUI
import { AppBar, Badge, Box, Container, Drawer, Grid, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Form
import { useForm } from "react-hook-form";
import { RadioHook } from '../../../components/form/radio';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFilterBox, setFilters } from '../../../store/slices/tables';

export default function Filtrador() {
  const { filterBox, filters, countFilters } = useSelector(state => state.tables.registros);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const handleOpen = () => {
    dispatch(setFilterBox({ open: true, select: 'registros' }));
  }

  const onClose = async data => {
    await dispatch(setFilters({ data, select: 'registros' }));
    dispatch(setFilterBox({ open: false, select: 'registros' }));
  }

  const handleReset = () => {
    reset({
      type: 'all'
    });
  }

  return (
    <>
      <Badge badgeContent={countFilters} color="primary">
        <Tooltip title='Filtrador' arrow>
          <IconButton color='inherit' onClick={handleOpen} data-tour="gdReg__filters">
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
                <Grid item xs>
                  <RadioHook 
                    label='Tipo de registro'
                    name='type'
                    defaultValue={filters.type}
                    row
                    radioList={[
                      {
                        value: 'all',
                        label: 'Todos'
                      },
                      {
                        value: 'gedure',
                        label: 'Gedure'
                      },
                      {
                        value: 'transaction',
                        label: 'Transacciones'
                      },
                      {
                        value: 'session',
                        label: 'Sesión'
                      },
                      {
                        value: 'user',
                        label: 'Usuario'
                      }
                    ]}
                    control={control}
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

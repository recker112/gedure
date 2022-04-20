import React from 'react'

// MUI
import { AppBar, Badge, Box, Button, Container, Drawer, Grid, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Form
import { useForm } from "react-hook-form";
import { RadioHook } from '../../../components/form/radio';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFilterBox, setFilters } from '../../../store/slices/gedure/registros';

export default function Filtrador() {
  const { filterBox, filters, countFilters } = useSelector(state => state.gdRegistros);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const handleOpen = () => {
    dispatch(setFilterBox(true));
  }

  const handleClose = () => {
    dispatch(setFilterBox(false));
  }

  const handleReset = () => {
    reset({
      type: 'all'
    });
  }

  const onSubmit = async data => {
    await dispatch(setFilters(data));
    handleClose();
  }

  return (
    <>
      <Grid item xs={12}>
        <Badge badgeContent={countFilters} color="primary">
          <Button
            startIcon={<FilterListIcon />}
            color='inherit'
            onClick={handleOpen}
          >
            Filtrador
          </Button>
        </Badge>
      </Grid>

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
                <IconButton onClick={handleSubmit(onSubmit)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Container>
            <Box mt={2}>
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

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
import { setFilterBox, setFilters } from '../../../store/slices/tablesWallet';

export default function Filtrador({ gotoPage }) {
  const { filterBox, filters, countFilters } = useSelector(state => state.tablesWallet.deudas);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });

  const handleOpen = () => {
    dispatch(setFilterBox({ open: true, select: 'deudas' }));
  }

  const onClose = async data => {
    gotoPage(0);
    await dispatch(setFilters({ data, select: 'deudas' }));
    dispatch(setFilterBox({ open: false, select: 'deudas' }));
  }

  const handleReset = () => {
    reset({
      future: 'no',
    });
  }

  return (
    <>
      <Badge badgeContent={countFilters} color="primary">
        <Tooltip title='Filtrador' arrow>
          <IconButton color='inherit' data-tour="gdUser__filters" onClick={handleOpen}>
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
                    label='Ver deudas futuras'
                    name='future'
                    defaultValue={filters.future}
                    row
                    radioList={[
                      {
                        value: 'no',
                        label: 'No'
                      },
                      {
                        value: 'si',
                        label: 'Si'
                      },
                    ]}
                    rules={{}}
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

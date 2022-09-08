import React, { useEffect } from 'react';

// MUI
import { Box, Container, Fade, Grid, Link, Slide, Stack, Typography } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import { Wallet as WalletIcon } from 'mdi-material-ui';

// Components
import NotiBox from './NotiBox';
import SingleBox from './SingleBox';
import useNotifier from '../../../hooks/useNotifier';
import TourHome from './TourHome';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getInfoBox } from '../../../store/slices/requestStatus/async_trunk/home/getInfoBox';
import { resetDataRequest } from '../../../store/slices/requestStatus';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

const classes = {
  container: {
    flexGrow: 1,
  },
  header: (theme) => ({
		background: theme.palette.primary.main,
		height: 400,
		borderRadius: '0px 0px 15px 15px'
	}),
  content: {
		position: 'relative',
		top: -80,
	}
};

function Header() {
  const name = useSelector(state => state.auth.user.name);

  return (
    <Container sx={{height: '100%', userSelect: 'none'}}>
      <Grid container justifyContent='flex-start' alignItems='center' sx={{height: '100%'}}>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h4.fontSize', md: 'h3.fontSize' }} className='text__bold--semi'>
						<Box color='secondary.main' component='span'>Hola</Box> {name},
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi'>
						Bienveido a <Box color='secondary.main' component='span'>Gedure</Box>
					</Box>
				</Grid>
			</Grid>
    </Container>
  );
}

export default function Home() {
  useNotifier({
    messageTo200: false,
  });
  
  const { infoBox: { loading, data }, privilegio, count_notify } = useSelector(state => ({
    infoBox: state.requestStatus.infoBox,
    privilegio: state.auth.user.privilegio,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Gedure - La Candelaria` : 'Gedure - La Candelaria';

  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getInfoBox());
    }

    return () => {
      if (loading) {
        promise.abort();
      }
      dispatch(resetDataRequest({ select: 'infoBox' }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box component='main' sx={classes.container}>
      <Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={classes.header}>
          <Header />
        </Box>
      </Slide>
      <Fade in={true} style={{ transitionDelay: '1000ms' }}>
        <Container sx={classes.content}>
          <Grid container justifyContent='center' spacing={2} data-tour='infoBox'>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <SingleBox
                  title='Saldo en cuenta'
                  data={data.wallet}
                  textPrimaryFormat={ amount => parseFloatToMoneyString(amount) }
                  colorTPrimary={(data.wallet?.textPrimary > 0 && 'success.main') || (data.wallet?.textPrimary <= 0 && 'text.secondary')}
                  loading={loading}
                  icon={<WalletIcon />}
                />
                {privilegio === 'V-' && (
                  <SingleBox
                    title='Estado de deudas'
                    data={data.debts}
                    extraInfo={<Typography>El precio mostrado aquí es la sumatoria de todas las deudas pendientes para poder estar solvente.</Typography>}
                    textPrimaryFormat={ amount =>  `${parseFloatToMoneyString(amount)}`}
                    colorTPrimary={(data.debts?.textPrimary > 0 && 'error.main') || (data.debts?.textPrimary <= 0 && 'text.secondary')}
                    loading={loading}
                    icon={<SavingsIcon />}
                  />
                )}
                <SingleBox
                  title='Tasa de cambio'
                  extraInfo={<Typography>Esta tasa de cambio está sincronizada con el <Link target='_blank' href='http://www.bcv.org.ve'>Banco Central de Venezuela (BCV)</Link>.</Typography>}
                  data={data.exrate}
                  textPrimaryFormat={ amount => `$1 = ${parseFloatToMoneyString(amount)}` }
                  loading={loading}
                  icon={<CurrencyExchangeIcon />}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <NotiBox 
                  data={data.posts}
                  title='Noticias'
                  loading={loading}
                  icon={<NewspaperIcon />}
                />
                {privilegio === 'V-' && (
                  <NotiBox 
                    data={data.boletas} 
                    title='Boletas cargadas' 
                    loading={loading}
                    icon={<InsertDriveFileIcon />}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Fade>
      <TourHome />
    </Box>
  )
}

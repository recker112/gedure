import { useEffect } from 'react';

// MUI
import { Box, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Components
import { BadgeAlert } from '../BadgeAlert';
import InfiniteScroll from 'react-infinite-scroll-component';
import { parseFloatToMoneyString, parseToAccountString } from '../Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getNotify } from '../../store/slices/auth/getNotifys';
import { resetNotify } from '../../store/slices/auth';

function Notify({
  type,
  id,
  data,
}) {
  let typeParse = type.replaceAll('\\', "-").split('-');
  typeParse = typeParse[typeParse.length - 1];
  
  if (typeParse === "BankTransactionsProcessedNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>{data.title}</Typography>
        <Typography variant='body2' className='text__opacity--semi'>Todas las trasacciones subidas fueron procesadas para la cuenta bancaria: 
        <br/>- N° cuenta: {parseToAccountString(data.bank_account.n_account || 0)}
        <br/>- Nombre: {data.bank_account.name}
        <br/>- Correo: {data.bank_account.email}</Typography>
      </Box>
    )
  }else if (typeParse === "BankTransactionAssignNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>{data.title}</Typography>
        <Typography variant='body2' className='text__opacity--semi'>Un administrador te asignó manualmente una transacción la cual acredita {parseFloatToMoneyString(data.bank_transaction.amount)} a su cuenta.</Typography>
      </Box>
    )
  }

  return null;
}

export default function RenderNotify({
  handleClose
}) {
  const { loading, data, hasFinish } = useSelector((state) => ({
    loading: state.auth.notify.loading,
    data: state.auth.notify.data,
    hasFinish: state.auth.notify.finish,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(getNotify());

    return () => {
      promise.abort();
      dispatch(resetNotify());
    }
  },[])

  return (
    <>
      <Stack sx={{padding: 2}} direction='row' alignItems='center' justifyContent='space-between'>
        <Typography fontSize='h6.fontSize' className='text__bold--semi'>Notificaciones</Typography>
        <IconButton sx={{ display: { xs: 'inherit', sm: 'none' } }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box id='scrollNotify' sx={{width: { xs: 330, sm: 400 }, height: 400, overflow: 'auto'}}>
        {loading && (
          <Box height={1/1} display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Box>
        )}
        {(!loading && data.length > 0) && (
          <InfiniteScroll
            style={{ overflow: 'none', padding: 16 }}
            dataLength={data.length}
            hasMore={!hasFinish}
            next={() => {
              dispatch(getNotify({ type: 'more' }));
            }}
            scrollThreshold={0.9}
            scrollableTarget='scrollNotify'
            loader={
              <Box sx={{ marginTop: 2 }} textAlign="center">
                <CircularProgress />
              </Box>
            }
            endMessage={
              <Typography sx={{ marginTop: 2 }} className='text__opacity--semi' align="center">
                No tiene más notificaciones.
              </Typography>
            }
          >
            <Stack spacing={4}>
              {data.map((notify, i) => {
                if (!notify.read_at) {
                  return (
                    <BadgeAlert key={i} color='primary' variant='dot'>
                      <Notify {...notify} />
                    </BadgeAlert>
                  )
                }

                return (
                  <Notify key={i} {...notify} />
                )
              })}
            </Stack>
          </InfiniteScroll>
        )}
        {(!loading && data.length <= 0) && (
          <Box height={1/1} display='flex' justifyContent='center' alignItems='center' className='text__opacity--semi'>
            Por los momentos no tiene notificaciones
          </Box>
        )}
      </Box>
    </>
  )
}
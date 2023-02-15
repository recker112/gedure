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
        <Typography className='text__bold--semi'>Transacciones bancarias cargadas</Typography>
        <Typography variant='body2' className='text__opacity--semi'>Todas las trasacciones bancarias de la cuenta {parseToAccountString(data.bank_account.n_account || 0)} fueron subidas y procesadas correctamente.</Typography>
      </Box>
    )
  }else if (typeParse === "BankTransactionAssignNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>Transacción asiganda manualmente</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          Un administrador te asignó manualmente una transacción bancaria, lo cual acredita {parseFloatToMoneyString(data.bank_transaction.amount)} a su cuenta.
        </Typography>
      </Box>
    )
  }else if (typeParse === "StudiendsUploadCompletedNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>Carga de estudiantes finalizada</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          El sistema terminó de procesar el archivo excel, dando como resultado el nuevo ingreso de {data.inserts} estudiante(s), actualizando {data.updateds} estudiante(s), y no pudiendo cargar a {data.errors.length} estudiante(s).
        </Typography>
      </Box>
    )
  }else if (typeParse === "ProcessBoletasCompletedNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>Boletas procesadas correctamente</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          El sistema terminó de procesar el archivo zip, ingresando {data.inserts} boleta(s) nueva(s) y actualizando {data.updateds} boleta(s).
        </Typography>
      </Box>
    )
  }else if (typeParse === "DebtCreatedNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>Deuda pendiente</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          Se le ha asignado una nueva deuda de {parseFloatToMoneyString(data.amount)}.
        </Typography>
      </Box>
    )
  }else if (typeParse === "PendingPaymentCompletedNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>Pago verificado correctamente</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          Su pago pendiente fue verificado correctamente, acreditándole {parseFloatToMoneyString(data.amount)} a su cuenta.
        </Typography>
      </Box>
    )
  }else if (typeParse === "TransferCompletedNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>Transferencia recibida</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          {!data.manual ? (
            <>
              Se realizo una transferencia de saldo hacia su cuenta, lo cuál le acredita {parseFloatToMoneyString(data.balance)}
            </>
          ) : (
            <>
              Se acreditó manualmente un monto de {parseFloatToMoneyString(data.balance)} hacia su cuenta.
            </>
          )}
        </Typography>
      </Box>
    )
  }else if (typeParse === "SocketsNotification") {
    return (
      <Box>
        <Typography className='text__bold--semi'>{data.title}</Typography>
        <Typography variant='body2' className='text__opacity--semi'>
          {data.content}
        </Typography>
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

    // eslint-disable-next-line
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
                    <BadgeAlert key={i} variant='dot'>
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
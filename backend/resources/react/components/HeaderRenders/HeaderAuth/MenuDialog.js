import React from 'react'

//Material-UI
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, useMediaQuery, DialogContentText } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Redux
import { connect } from 'react-redux';
import updateMenuUser from '../../../actions/panel/updateMenuUser';
import updateLoading from '../../../actions/updateLoading';
import responseUpdateMenuUser from '../../../actions/panel/responseUpdateMenuUser';
import errorInfo from '../../../actions/errorInfo';
import { useSnackbar } from 'notistack';
import AnimationDialog from '../../AnimationDialog';
import { verifyDataPassword, verifyDataAvatar } from './contentMenuUser/verifiData';
import ContentPassword from './contentMenuUser/ContentPassword';
import ContentAvatar from './contentMenuUser/ContentAvatar';

function MenuDialog({ openDialog, option, response, loading, updateMenuUser, passA, passN, passR, updateLoading, responseUpdateMenuUser, errorInfo, file, userAvatar, userName }) {
  //SnackBar
  const { enqueueSnackbar } = useSnackbar();

  //Resolution RESPONSIVE DIALOG
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    updateMenuUser(false, option);
  }

  //Lista con las opciones disponibles
  const listOptions = [
    {
      keySelect: "avatar",
      title: 'Cambiar avatar',
      submitTitle: "Actualizar",
      content: <ContentAvatar
        response={response}
      />
    },
    {
      keySelect: "password",
      title: 'Cambiar contraseña',
      submitTitle: "Actualizar",
      content: <ContentPassword
        response={response}
      />,
    }
  ]

  const handleSubmit = (e) => {
    //Preparativos
    e.preventDefault();
    let errorStatus = false;

    //Verificar datos
    if (option === "password") {
      errorStatus = verifyDataPassword(passA, passN, passR, errorInfo);
    }else if (option === "avatar") {
      errorStatus = verifyDataAvatar(file, errorInfo, enqueueSnackbar);
    }

    if (errorStatus) {
      return null;
    }

    //REQ
    updateLoading(true, 'MENU_USER_DIALOG');
    
    //REQ SUCCESS
    if (option === 'avatar') {
      responseUpdateMenuUser("Avatar cambiado");
    } else if (option === 'password') {
      responseUpdateMenuUser("Contraseña cambiada");
    }
  }

  const elementoShow = listOptions.map((element, i) => {
    if (element.keySelect === option) {
      return (
        <Dialog
          key={i}
          open={openDialog}
          aria-labelledby={`form-change-${option}-title`}
          TransitionComponent={AnimationDialog}
          fullScreen={fullScreen}
        >
          <DialogTitle id="form-change-password-title">{element.title}</DialogTitle>
          <form method="POST" autoComplete="false" onSubmit={handleSubmit} style={{ marginTop: "0" }}>
            <DialogContent dividers>
              {(!loading && !response) && element.content}
              {loading && <CircularProgress />}
              {response && <DialogContentText>{response.message}</DialogContentText>}
            </DialogContent>
            {!loading &&
              <DialogActions>
                {!response &&
                  <React.Fragment>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" color="primary">{element.submitTitle}</Button>
                  </React.Fragment>
                }
                {response &&
                  <Button color="primary" onClick={() => {
                    updateMenuUser(true, option);
                  }}>Entendido</Button>
                }
              </DialogActions>
            }
          </form>
        </Dialog>
      );
    } else {
      return false;
    }
  });

  return elementoShow;
}

//Redux
const mapStateToProps = (state) => ({
  openDialog: state.panelSettings.menuUser.openDialog,
  option: state.panelSettings.menuUser.option,
  response: state.panelSettings.menuUser.response,
  loading: state.panelSettings.menuUser.loading,
  passA: state.panelSettings.menuUser.sections.password.passA,
  passN: state.panelSettings.menuUser.sections.password.passN,
  passR: state.panelSettings.menuUser.sections.password.passR,
  file: state.panelSettings.menuUser.sections.avatar.file,
});

const mapDispatchToProps = {
  updateMenuUser,
  updateLoading,
  responseUpdateMenuUser,
  errorInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDialog);
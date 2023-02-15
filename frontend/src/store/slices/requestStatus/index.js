import { createSlice } from "@reduxjs/toolkit";

// Async request
import { reducersCreateBankAccount } from "./async_trunk/configuracion/pagos/createBankAccount";
import { reducersDeleteBankAccount } from "./async_trunk/configuracion/pagos/deleteBankAccount";
import { reducersEditBankAccount } from "./async_trunk/configuracion/pagos/editBankAccount";
import { reducersContacts } from "./async_trunk/contacts";
import { reducersInfoBox } from "./async_trunk/home/getInfoBox";
import { reducersLogin } from "./async_trunk/login";
import { reducersNewsPreview } from "./async_trunk/news/getNewsPreviews";
import { reducersNewsShow } from "./async_trunk/news/getNewsShow";
import { reducersChangePassword } from "./async_trunk/recovery/changePassword";
import { reducersSendEmail } from "./async_trunk/recovery/sendEmail";
import { reducersVerifyCode } from "./async_trunk/recovery/verifyCode";
import { reducersUserCreate } from "./async_trunk/users/createUser";
import { reducersDisableUser } from "./async_trunk/users/disableUser";
import { reducersDisableUserMassive } from "./async_trunk/users/disableUserMassive";
import { reducersGetCurso } from "./async_trunk/users/getCursos";
import { reducersGetUser } from "./async_trunk/users/getUser";
import { reducersUpdateAvatar } from "./async_trunk/users/updateAvatar";
import { reducersUpdateData } from "./async_trunk/users/updateData";
import { reducersUpdateSeccion } from "./async_trunk/users/updateSeccion";
import { reducersUploadMatricula } from "./async_trunk/users/uploadMatricula";
import { reducersGetBankAccounts } from "./async_trunk/configuracion/pagos/getBankAccounts";
import { reducersUploadTransactions } from "./async_trunk/configuracion/pagos/uploadTransactions";
import { reducersDeleteBankTransaction } from "./async_trunk/configuracion/pagos/deleteBankTransaction";
import { reducersSearchUser } from "./async_trunk/configuracion/pagos/searchUser";
import { reducersAssignTransaction } from "./async_trunk/configuracion/pagos/assignTransaction";
import { reducersResendEmailUser } from "./async_trunk/users/resendEmail";
import { reducersCreatePost } from "./async_trunk/publicaciones/createPost";
import { reducersDeletePost } from "./async_trunk/publicaciones/deletePost";
import { reducersRequestPost } from "./async_trunk/publicaciones/requestPost";
import { reducersEditPost } from "./async_trunk/publicaciones/editPost";
import { reducersDeleteMassiveBoletas } from "./async_trunk/boletas_admin/deleteBoletaMassive";
import { reducersDeleteBoleta } from "./async_trunk/boletas_admin/deleteBoleta";
import { reducersGetBoletas } from "./async_trunk/boletas_admin/verBoletas";
import { reducersDownloadBoleta } from "./async_trunk/boletas_admin/downloadBoleta";
import { reducersUploadBoleta } from "./async_trunk/boletas_admin/uploadBoleta";
import { reducersDeleteSoliContacto } from "./async_trunk/soli_contacto/deleteSoliContacto";
import { reducersGetBoletasUser } from "./async_trunk/boleta/getBoletasUser";
import { reducersDownloadBoletasUser } from "./async_trunk/boleta/downloadBoletaUser";
import { reducersCreateCurso } from "./async_trunk/configuracion/cursos/createCurso";
import { reducersDeleteCurso } from "./async_trunk/configuracion/cursos/deleteCurso";
import { reducersDeleteMassiveCursos } from "./async_trunk/configuracion/cursos/deleteMassiveCursos";
import { reducersRestoreUser } from "./async_trunk/configuracion/users/restoreUser";
import { reducersRestoreMassiveUser } from "./async_trunk/configuracion/users/restoreMassiveUsers";
import { reducersDestroyUser } from "./async_trunk/configuracion/users/destroyUser";
import { reducersDestroyMassiveUser } from "./async_trunk/configuracion/users/destroyMassiveUser";
import { reducersGetUserInvitation } from "./async_trunk/invitacion/getUserInvitacion";
import { reducersAcceptInvitation } from "./async_trunk/invitacion/acceptInvitation";
import { reducersDeleteMassiveBankAccount } from "./async_trunk/configuracion/pagos/deleteMassiveBankAccount";
import { reducersDeleteMassiveBankTransaction } from "./async_trunk/configuracion/pagos/deleteMassiveBankTransaction";
import { reducersReplaceBoleta } from "./async_trunk/boletas_admin/replaceBoleta";
import { reducersGetConfigs } from "./async_trunk/configuracion/general/getConfigs";
import { reducersSetConfigs } from "./async_trunk/configuracion/general/setConfigs";
import { reducersDownloadDataUser } from "./async_trunk/configuracion/users/downloadDataUser";

const initialState = {
  login: {
    loading: false,
  },
  recovery: {
    loading: false,
    data: {},
  },
  invitation: {
    loading: true,
    data: {},
    loadingAccept: false,
  },
  contacts: {
    loading: false,
  },
  newsPreview: {
    loading: true,
    hasFinish: false,
    search: '',
    data: [],
    error: false,
  },
  newsShow: {
    loading: true,
    data: {},
  },
  infoBox: {
    loading: true,
    data: {},
  },
  showReg: {
    open: false,
    data: {},
  },
  createUser: {
    open: false,
    loading: false,
    data: null,
  },
  uploadMatricula: {
    open: false,
    loading: false,
    progress: 0,
  },
  disableUser: {
    open: false,
    loading: false,
    data: {},
  },
  disableUserMassive: {
    open: false,
    loading: false,
    data: {},
  },
  updateSeccion: {
    open: false,
    loading: false,
    data: {},
  },
  userShow: {
    loading: true,
    userSelected: {
      alumno: {
        curso: {}
      },
      personal_data: {},
    },
    permissions: {
      sin_asignar: {},
      administrar: {},
      administrar_transac: {},
      gedure: {},
    }
  },
  personalAvatar: {
    loadingUpload: false,
    loadingDelete: false,
    progress: 0,
  },
  personalData: {
    loadingPD: false,
    loadingPE: false,
    loadingPU: false,
    loadingPO: false,
    loadingRD: false,
    loadingRU: false,
    loadingRE: false,
    loadingPDP: false,
    loadingPDM: false,
    loadingPC: false,
    loadingPP: false,
    loadingPPE: false,
    loadingPDU: false,
    loadingActiveAccount: false,
    loadingResendEmail: false,
  },
  createPost: {
    loading: false,
    progress: 0,
  },
  deletePost: {
    loading: false,
    open: false,
    data: {},
  },
  editPost: {
    loadingRequest: true,
    dataRequest: {},
    loading: false,
    progress: 0,
  },
  deleteBoleta: {
    loading: false,
    open: false,
    data: {}
  },
  deleteMassiveBoletas: {
    loading: false,
    open: false,
    data: {}
  },
  replaceBoleta: {
    loading: false,
    open: false,
    data: {},
    progress: 0,
  },
  verBoletas: {
    loading: true,
    data: [],
    progress: 0,
  },
  verBoletasUser: {
    loading: true,
    data: [],
    progress: 0,
    loadingDownload: false,
  },
  uploadBoleta: {
    open: false,
    loading: false,
    progress: 0,
  },
  verSoliContacto: {
    open: false,
    data: {}
  },
  deleteSoliContacto: {
    loading: false,
    open: false,
    data: {}
  },
  createCurso: {
    loading: false,
  },
  deleteCurso: {
    loading: false,
    open: false,
    data: {}
  },
  deleteMassiveCursos: {
    loading: false,
    open: false,
    data: {}
  },
  createBankAccount: {
    loading: false,
  },
  deleteBankAccount: {
    loading: false,
    open: false,
    data: {}
  },
  deleteBankAccountMassive: {
    loading: false,
    open: false,
    data: {}
  },
  editBankAccount: {
    loading: false,
    open: false,
    data: {}
  },
  uploadTransactions: {
    loading: false,
    open: false,
    progress: 0,
    data: {},
    autoComplete: []
  },
  assignTransaction: {
    loading: false,
    open: false,
    data: {},
    autoComplete: [],
  },
  deleteTransaction: {
    loading: false,
    open: false,
    data: {}
  },
  deleteMassiveBankTransaction: {
    loading: false,
    open: false,
    data: {}
  },
  restoreUser: {
    loading: false,
    open: false,
    data: {}
  },
  restoreMassiveUser: {
    loading: false,
    open: false,
    data: {}
  },
  destroyUser: {
    loading: false,
    open: false,
    data: {}
  },
  destroyMassiveUser: {
    loading: false,
    open: false,
    data: {}
  },
  getConfigs: {
    loading: true,
    data: null,
  },
  setConfigs: {
    loading: false,
  },
  downloadDataUsers: {
    loading: false,
    progress: 0,
  },
  showFAQ: {
    loading: false,
    open: false,
    data: {}
  },
};

export const requestStatusSlices = createSlice({
  name: "requestStatus",
  initialState,
  reducers: {
    setRequestStatus: (state, action) => {
      const { open, loading, data, select } = action.payload;

      (open !== undefined) && (state[select].open = open);
      loading && (state[select].loading = loading);
      data && (state[select].data = data);
    },
    setProgress: (state, action) => {
      const { select, percentCompleted } = action.payload;
      state[select].progress = percentCompleted;
    },
    setUserSelected: (state, action) => {
      const { user, permissions } = action.payload;
      state.userShow.userSelected = user;
      state.userShow.permissions = permissions;
    },
    updateInputs: (state, action) => {
      const { select, input, value } = action.payload;

      state[select][input] = value;

      if (select === 'newsPreview') {
        state[select].data = [];
      } else if (select === 'newsShow' || select === 'infoBox') {
        state[select].data = {};
      }
    },
    resetDataRequest: (state, action) => {
      const { select } = action.payload;

      state[select] = {...initialState[select]};
    },
  },
  extraReducers: {
    ...reducersLogin,
    ...reducersSendEmail,
    ...reducersVerifyCode,
    ...reducersChangePassword,
    ...reducersContacts,
    ...reducersNewsPreview,
    ...reducersNewsShow,
    ...reducersGetUserInvitation,
    ...reducersAcceptInvitation,
    ...reducersInfoBox,
    ...reducersUserCreate,
    ...reducersGetCurso,
    ...reducersUploadMatricula,
    ...reducersDisableUser,
    ...reducersDisableUserMassive,
    ...reducersUpdateSeccion,
    ...reducersGetUser,
    ...reducersUpdateAvatar,
    ...reducersUpdateData,
    ...reducersResendEmailUser,
    ...reducersCreatePost,
    ...reducersDeletePost,
    ...reducersRequestPost,
    ...reducersEditPost,
    ...reducersDeleteMassiveBoletas,
    ...reducersDeleteBoleta,
    ...reducersReplaceBoleta,
    ...reducersGetBoletas,
    ...reducersGetBoletasUser,
    ...reducersDownloadBoletasUser,
    ...reducersDownloadBoleta,
    ...reducersUploadBoleta,
    ...reducersDeleteSoliContacto,
    ...reducersCreateCurso,
    ...reducersDeleteCurso,
    ...reducersDeleteMassiveCursos,
    ...reducersCreateBankAccount,
    ...reducersDeleteBankAccount,
    ...reducersDeleteMassiveBankAccount,
    ...reducersEditBankAccount,
    ...reducersGetBankAccounts,
    ...reducersUploadTransactions,
    ...reducersDeleteBankTransaction,
    ...reducersDeleteMassiveBankTransaction,
    ...reducersSearchUser,
    ...reducersAssignTransaction,
    ...reducersRestoreUser,
    ...reducersRestoreMassiveUser,
    ...reducersDestroyUser,
    ...reducersDestroyMassiveUser,
    ...reducersGetConfigs,
    ...reducersSetConfigs,
    ...reducersDownloadDataUser,
  }
});

export default requestStatusSlices.reducer;

export const { setRequestStatus, setProgress, resetDataRequest, updateInputs, setUserSelected } = requestStatusSlices.actions;
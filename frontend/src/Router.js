// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Route, Routes, useMatch, Navigate } from 'react-router-dom';

// MUI
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar'
import Loader from './components/Router/Loader';
import Relogin from './components/Router/Relogin';
import { AuthProtect, NoSeeAuth } from './components/Router/Routers';
import { useSelector } from 'react-redux';

// Routers Main Page
const HomePage = lazy(() => import('./pages/home'));
const NewsPage = lazy(() => import('./pages/news'));
const NewsPageShow = lazy(() => import('./pages/news/show'));
const ContactPage = lazy(() => import('./pages/contacts'));
const LoginPage = lazy(() => import('./pages/login'));
const RecoveryPage = lazy(() => import('./pages/recovery'));
const LogoutPage = lazy(() => import('./pages/gedure/logout'));
const InvitacionPage = lazy(() => import('./pages/invitacion'));

// Gedure core
const HomeGedure = lazy(() => import('./pages/gedure/home'));
const RegistrosGedure = lazy(() => import('./pages/gedure/registros'));
const FAQGedure = lazy(() => import('./pages/gedure/faq'));
// User core
const UsuariosPage = lazy(() => import('./pages/gedure/usuarios'));
const UsuariosPageVer = lazy(() => import('./pages/gedure/usuarios/ver'));
const UsuariosPAvatar = lazy(() => import('./pages/gedure/usuarios/ver/perfil/PAvatar'));
const UsuariosPDatos = lazy(() => import('./pages/gedure/usuarios/ver/perfil/PDatos'));
const UsuariosPEstudiante = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/PEstudiante'));
const UsuariosPUbicacion = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/PUbicacion'));
const UsuariosPOtros = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/POtros'));
const UsuariosRDatos = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/RDatos'));
const UsuariosRUbicacion = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/RUbicacion'));
const UsuariosREmpleo = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/REmpleo'));
const UsuariosPDPadre = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/PDPadre'));
const UsuariosPDMadre = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/PDMadre'));
const UsuariosPDUsuario = lazy(() => import('./pages/gedure/usuarios/ver/personal_data/PDUsuario'));
const UsuariosPCurso = lazy(() => import('./pages/gedure/usuarios/ver/curso/PCurso'));
const UsuariosPPassword = lazy(() => import('./pages/gedure/usuarios/ver/credenciales/PPassword'));
const UsuariosPPermisos = lazy(() => import('./pages/gedure/usuarios/ver/permisos/PPermisos'));
const UsuariosPOpciones = lazy(() => import('./pages/gedure/usuarios/ver/opciones/POpciones'));

// Publicaciones
const PublicacionesPage = lazy(() => import('./pages/gedure/publicaciones'));
const PublicacionesCrear = lazy(() => import('./pages/gedure/publicaciones/crear'));
const PublicacionesEditar = lazy(() => import('./pages/gedure/publicaciones/editar'));

// Boletas
const BoletasPage = lazy(() => import('./pages/gedure/boletas_admin'));
const BoletasVer = lazy(() => import('./pages/gedure/boletas_admin/ver'));

// Solicitudes
const SoliContactoPage = lazy(() => import('./pages/gedure/soli_contacto'));

// Cuenta
const CuentaPage = lazy(() => import('./pages/gedure/cuenta'));
const CuentaPAvatar = lazy(() => import('./pages/gedure/cuenta/perfil/CPerfil'));
const CuentaPDatos = lazy(() => import('./pages/gedure/cuenta/perfil/CDatos'));
const CuentaPassword = lazy(() => import('./pages/gedure/cuenta/credenciales/CPassword'));
const CuentaPDUsuario = lazy(() => import('./pages/gedure/cuenta/personal_data/CUsuario'));
const CuentaPEstudiante = lazy(() => import('./pages/gedure/cuenta/personal_data/CEstudiante'));
const CuentaPUbicacion = lazy(() => import('./pages/gedure/cuenta/personal_data/CUbicacion'));
const CuentaPOtros = lazy(() => import('./pages/gedure/cuenta/personal_data/COtros'));
const CuentaRDatos = lazy(() => import('./pages/gedure/cuenta/personal_data/CRDatos'));
const CuentaRUbicacion = lazy(() => import('./pages/gedure/cuenta/personal_data/CRUbicacion'));
const CuentaREmpleo = lazy(() => import('./pages/gedure/cuenta/personal_data/CREmpleo'));
const CuentaDMadre = lazy(() => import('./pages/gedure/cuenta/personal_data/CDMadre'));
const CuentaDPadre = lazy(() => import('./pages/gedure/cuenta/personal_data/CDPadre'));
const CuentaPOpciones = lazy(() => import('./pages/gedure/cuenta/opciones'));

// Setup
const SetupPage = lazy(() => import('./pages/gedure/setup'));

// UserBoletas
const UBoletasPage = lazy(() => import('./pages/gedure/boletas'));

// Gedure Config
const GDHeaders = lazy(() => import('./pages/gedure/configuracion'));
const GDHomePage = lazy(() => import('./pages/gedure/configuracion/home'));
const GDCursosPage = lazy(() => import('./pages/gedure/configuracion/cursos'));
const GDUserDisPage = lazy(() => import('./pages/gedure/configuracion/usuarios_desactivados'));
const GDPagosPage = lazy(() => import('./pages/gedure/configuracion/pagos'));

// Lotes deudas
const LotesDeudasPage = lazy(() => import('./pages/gedure/lotes_deudas'));
const ShowLotesDeudasPage = lazy(() => import('./pages/gedure/lotes_deudas/ver'));

// Transacciones
const TransaccionesPage = lazy(() => import('./pages/gedure/transacciones'));
const VerTransaccionesPage = lazy(() => import('./pages/gedure/transacciones/ver'));

// Monedero
const MonederoPage = lazy(() => import('./pages/gedure/monedero'));

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
}

function NotFound() {
	return (
		<Box sx={classes.container} fontSize='body1.fontSize' textAlign='center'>
			La dirección que está solicitando no se encuentra disponible actualmente.
		</Box>
	);
}

export default function Routers() {
  const match = useMatch('/entrar');
  const match2 = useMatch('/recuperar');

  const { permissions, privilegio } = useSelector(state => ({
    permissions: state.auth.permissions,
    privilegio: state.auth.user.privilegio,
  }));
  const { registros_index } = permissions.sin_asignar;
  const { users_index, posts_index, posts_create, posts_edit, boletas_index, contact_index } = permissions.administrar;
  const { 
    cursos_index, 
    bank_account_index, 
    bank_transaction_index, 
    users_disabled_index
   } = permissions.gedure;
  const { debt_lote_index, transaction_index } = permissions.administrar_transac;

  return (
    <Suspense fallback={<Loader />}>
      <Relogin>
        {(!match && !match2) && <Navbar />}

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index path='/' element={
              <NoSeeAuth>
                <HomePage />
              </NoSeeAuth>
            } />

            <Route path='/noticias/*'>
              <Route path='' element={<NewsPage />} />
              <Route path=':slug' element={<NewsPageShow />} />
            </Route>

            <Route path='/contactanos' element={<ContactPage />} />

            <Route path='/entrar' element={
              <NoSeeAuth>
                <LoginPage />
              </NoSeeAuth>
            } />

            <Route path='/recuperar' element={
              <NoSeeAuth>
                <RecoveryPage />
              </NoSeeAuth>
            } />

            <Route path='/invitacion/:key' element={
              <NoSeeAuth>
                <InvitacionPage />
              </NoSeeAuth>
            } />

            <Route path='/gedure/*'>
              <Route path='' element={
                <AuthProtect>
                  <HomeGedure />
                </AuthProtect>
              } />

              {privilegio === 'A-' && (
                <>
                  {registros_index && (
                    <Route path='registros' element={
                      <AuthProtect>
                        <RegistrosGedure />
                      </AuthProtect>
                    } />
                  )}

                  {users_index && (
                    <Route path='usuarios/*'>
                      <Route path='' element={
                        <AuthProtect>
                          <UsuariosPage />
                        </AuthProtect>
                      } />

                      <Route path='ver/:id/' element={
                        <AuthProtect>
                          <UsuariosPageVer />
                        </AuthProtect>
                      }>
                        <Route path='' element={
                          <>
                            <UsuariosPAvatar />
                            <UsuariosPDatos />
                          </>
                        } />

                        <Route path='personal/estudiante' element={
                          <>
                            <UsuariosPEstudiante />
                            <UsuariosPUbicacion />
                            <UsuariosPOtros />
                          </>
                        } />

                        <Route path='personal/representante' element={
                          <>
                            <UsuariosRDatos />
                            <UsuariosRUbicacion />
                            <UsuariosREmpleo />
                          </>
                        } />

                        <Route path='personal/padres' element={
                          <>
                            <UsuariosPDMadre />
                            <UsuariosPDPadre />
                          </>
                        } />

                        <Route path='personal/usuario' element={
                          <UsuariosPDUsuario />
                        } />

                        <Route path='curso' element={
                          <UsuariosPCurso />
                        } />

                        <Route path='credenciales' element={
                          <UsuariosPPassword />
                        } />

                        <Route path='permisos' element={
                          <UsuariosPPermisos />
                        } />

                        <Route path='opciones' element={
                          <UsuariosPOpciones />
                        } />

                        <Route path='*' element={<Navigate to="" replace />} />
                      </Route>
                    </Route>
                  )}

                  {posts_index && (
                    <Route path='publicaciones/*'>
                      <Route path='' element={
                        <AuthProtect>
                          <PublicacionesPage />
                        </AuthProtect>
                      } />

                      {posts_create && (
                        <Route path='crear' element={
                          <AuthProtect>
                            <PublicacionesCrear />
                          </AuthProtect>
                        } />
                      )}

                      {posts_edit && (
                        <Route path='editar/:slug' element={
                          <AuthProtect>
                            <PublicacionesEditar />
                          </AuthProtect>
                        } />
                      )}

                      <Route path='*' element={
                        <AuthProtect>
                          <NotFound/>
                        </AuthProtect>
                      } />
                    </Route>
                  )}

                  {boletas_index && (
                    <Route path='boletas/*'>
                      <Route path='' element={
                        <AuthProtect>
                          <BoletasPage />
                        </AuthProtect>
                      } />

                      <Route path='ver/:id' element={
                        <AuthProtect>
                          <BoletasVer />
                        </AuthProtect>
                      } />

                      <Route path='*' element={
                        <AuthProtect>
                          <NotFound/>
                        </AuthProtect>
                      } />
                    </Route>
                  )}

                  {contact_index && (
                    <Route path='soli-contacto' element={
                      <AuthProtect>
                        <SoliContactoPage />
                      </AuthProtect>
                    } />
                  )}

                  {Boolean(Object.keys(permissions.gedure).length) && (
                    <Route path='config' element={
                      <AuthProtect>
                        <GDHeaders />
                      </AuthProtect>
                    }>
                      <Route path='' element={<GDHomePage />} />

                      {cursos_index && (
                        <Route path='cursos' element={<GDCursosPage />} />
                      )}

                      {(bank_account_index || bank_transaction_index) && (
                        <Route path='pagos' element={<GDPagosPage />} />
                      )}

                      {users_disabled_index && (
                        <Route path='usuarios-desactivados' element={<GDUserDisPage />} />
                      )}

                      <Route path='*' element={<Navigate to="" replace />} />
                    </Route>
                  )}
                </>
              )}

              {debt_lote_index && (
                <Route path='lotes-deudas/*'>
                  <Route path='' element={
                    <AuthProtect>
                      <LotesDeudasPage />
                    </AuthProtect>
                  } />

                  <Route path='ver/:id' element={
                    <AuthProtect>
                      <ShowLotesDeudasPage />
                    </AuthProtect>
                  } />

                  <Route path='*' element={
                    <AuthProtect>
                      <NotFound/>
                    </AuthProtect>
                  } />
                </Route>
              )}

              {transaction_index && (
                <Route path='transacciones/*'>
                  <Route path='' element={
                    <AuthProtect>
                      <TransaccionesPage />
                    </AuthProtect>
                  } />

                  <Route path='ver/:id' element={
                    <AuthProtect>
                      <VerTransaccionesPage />
                    </AuthProtect>
                  } />

                  <Route path='*' element={
                    <AuthProtect>
                      <NotFound/>
                    </AuthProtect>
                  } />
                </Route>
              )}

              <Route path='monedero/*'>
                <Route path='' element={
                  <AuthProtect>
                    <MonederoPage />
                  </AuthProtect>
                } />

                <Route path='*' element={
                  <AuthProtect>
                    <NotFound/>
                  </AuthProtect>
                } />
              </Route>

              {privilegio === 'V-' && (
                <>
                  <Route path='boletas' element={
                    <AuthProtect>
                      <UBoletasPage />
                    </AuthProtect>
                  } />
                </>
              )}

              <Route path='cuenta' element={
                <AuthProtect>
                  <CuentaPage />
                </AuthProtect>
              }>
                <Route path='' element={
                  <>
                    <CuentaPAvatar />
                    <CuentaPDatos />
                  </>
                } />

                <Route path='personal/usuario' element={
                  <CuentaPDUsuario />
                } />

                <Route path='personal/estudiante' element={
                  <>
                    <CuentaPEstudiante />
                    <CuentaPUbicacion />
                    <CuentaPOtros />
                  </>
                } />

                <Route path='personal/representante' element={
                  <>
                    <CuentaRDatos />
                    <CuentaRUbicacion />
                    <CuentaREmpleo />
                  </>
                } />

                <Route path='personal/padres' element={
                  <>
                    <CuentaDMadre />
                    <CuentaDPadre />
                  </>
                } />

                <Route path='credenciales' element={
                  <CuentaPassword />
                } />

                <Route path='opciones' element={
                    <CuentaPOpciones />
                  } />

                <Route path='*' element={<Navigate to="" replace />} />
              </Route>

              <Route path='preguntas-frecuentes' element={
                <AuthProtect>
                  <FAQGedure />
                </AuthProtect>
              } />

              <Route path='*' element={
                <AuthProtect>
                  <NotFound/>
                </AuthProtect>
              } />
            </Route>

            <Route path='setup' element={
              <AuthProtect>
                <SetupPage />
              </AuthProtect>
            } />

            <Route path='logout' element={
              <AuthProtect returnBack activedAtPass>
                <LogoutPage />
              </AuthProtect>
            } />

            <Route path='*' element={<NotFound/>} />
          </Routes>
        </Suspense>
      </Relogin>
    </Suspense>
  )
}

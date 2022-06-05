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
const LogoutPage = lazy(() => import('./pages/gedure/logout'));

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

  const { permissions } = useSelector(state => state.auth);
  const { registros_index } = permissions.sin_asignar;
  const { users_index, posts_index, posts_create, posts_edit, boletas_index, contact_index } = permissions.administrar;

  return (
    <Suspense fallback={<Loader />}>
      <Relogin>
        {(!match) && <Navbar />}

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

            <Route path='/gedure/*'>
              <Route path='' element={
                <AuthProtect>
                  <HomeGedure />
                </AuthProtect>
              } />

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

                <Route path='credenciales' element={
                  <CuentaPassword />
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

            <Route path='logout' element={
              <AuthProtect returnBack>
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

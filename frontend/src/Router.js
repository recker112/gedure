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

// Routers
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
const UsuariosPCurso = lazy(() => import('./pages/gedure/usuarios/ver/curso/PCurso'));
const UsuariosPPassword = lazy(() => import('./pages/gedure/usuarios/ver/credenciales/PPassword'));
const UsuariosPPermisos = lazy(() => import('./pages/gedure/usuarios/ver/permisos/PPermisos'));

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
  const { users_index } = permissions.administrar;

  return (
    <Suspense fallback={<Loader />}>
      <Relogin>
        {(!match) && <Navbar />}

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
            {/* GEDURE */}
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

            {/* USER */}
            {users_index && (
              <Route path='usuarios/*'>
                <Route path='' element={
                  <AuthProtect>
                    <UsuariosPage />
                  </AuthProtect>
                } />

                {/* USER SHOW */}
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

                  <Route path='curso' element={
                    <UsuariosPCurso />
                  } />

                  <Route path='credenciales' element={
                    <UsuariosPPassword />
                  } />

                  <Route path='permisos' element={
                    <UsuariosPPermisos />
                  } />

                  {/* REDIRECT USER SHOW */}
                  <Route path='*' element={<Navigate to="" replace />} />
                </Route>
              </Route>
            )}

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
      </Relogin>
    </Suspense>
  )
}

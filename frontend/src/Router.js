// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Route, Routes, useMatch } from 'react-router-dom';

// MUI
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar'
import Loader from './components/Router/Loader';
import Relogin from './components/Router/Relogin';
import { AuthProtect, NoSeeAuth } from './components/Router/Routers';

// Routers
const HomePage = lazy(() => import('./pages/home'));
const NewsPage = lazy(() => import('./pages/news'));
const NewsPageShow = lazy(() => import('./pages/news/show'));
const ContactPage = lazy(() => import('./pages/contacts'));
const LoginPage = lazy(() => import('./pages/login'));
const HomeGedure = lazy(() => import('./pages/gedure/home'));
const FAQGedure = lazy(() => import('./pages/gedure/faq'));

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
            <Route path='' element={
              <AuthProtect>
                <HomeGedure />
              </AuthProtect>
            } />

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

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Relogin>
    </Suspense>
  )
}

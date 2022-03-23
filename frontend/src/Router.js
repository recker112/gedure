// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Route, Routes, useMatch } from 'react-router-dom';

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
                <div>PANEL</div>
              </AuthProtect>
            } />
          </Route>

          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Relogin>
    </Suspense>
  )
}

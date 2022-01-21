// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Route, Routes, useMatch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'

// Routers
const HomePage = lazy(() => import('./pages/home'));
const NewsPage = lazy(() => import('./pages/news'));
const NewsPageShow = lazy(() => import('./pages/news/show'));
const ContactPage = lazy(() => import('./pages/contacts'));

export default function Routers() {
  const match = useMatch('/entrar');

  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      {(!match) && <Navbar />}

      <Routes>
        <Route index path='/' element={<HomePage />} />

        <Route path='/noticias/*'>
          <Route path='' element={<NewsPage />} />
          <Route path=':slug' element={<NewsPageShow />} />
        </Route>

        <Route path='/contactanos' element={<ContactPage />} />

        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  )
}

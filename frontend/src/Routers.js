// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Route, Routes, useMatch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'

// Routers
const HomePage = lazy(() => import('./pages/home'));
const NewsPage = lazy(() => import('./pages/news'));

export default function Routers() {
  const match = useMatch('/entrar');

  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      {(!match) && <Navbar />}

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/noticias/*'>
          <Route path='' element={<NewsPage />} />
          <Route path=':id' element={<h1>Noticias new</h1>} />
        </Route>

        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  )
}

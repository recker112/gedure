// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'

// Routers
const HomePage = lazy(() => import('./pages/home'));

export default function Routers() {
  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/noticias/*'>
          <Route path='' element={<h1>Noticias index</h1>} />
          <Route path=':id' element={<h1>Noticias new</h1>} />
        </Route>

        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  )
}

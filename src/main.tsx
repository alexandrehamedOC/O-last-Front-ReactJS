import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './components/App/App';
import Root from './pages/Root';

import Annonce from './components/Annonce/Annonce'
import Profil from './components/Profil/Profil'
import Login from './components/Login/Login';


import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<App />} />
          <Route path="/annonce" element={<Annonce />} />
          <Route path="/profile/:id" element={<Profil />} />
          <Route path="/connexion" element={<Login />} />
      </Route>
    </>
  )
);

root.render(<RouterProvider router={router} />);

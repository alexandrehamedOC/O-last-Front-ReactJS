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

import Annonce from './components/Annonce/Annonce';
import Profil from './components/Profil/Profil';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import SendMailForgotPassword from './components/forgotPassword/sendMailForgotPassword/sendMailForgotPassword';
import FormNewPassword from './components/forgotPassword/formNewPassword/formNewPassword';

import './styles/index.scss';
import { AuthProvider } from './context/AuthContext';
import EditProfil from './components/Profil/EditProfil/EditProfil';
import EditAnnonce from './components/Profil/EditAnnonce/EditAnnonce';

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
        <Route path="/editprofil/:id" element={<EditProfil />} />
        <Route path="/editannonce/:id" element={<EditAnnonce />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<SignIn />} />
        <Route path="/mot-de-passe-oublie" element={<SendMailForgotPassword />} />
        <Route path="/nouveau-mot-de-passe" element={<FormNewPassword />}/>
      </Route>
    </>
  )
);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

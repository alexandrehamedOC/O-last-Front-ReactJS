import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// Mise en place du lazy loading
const Root = lazy(() => import('./pages/Root'));
const App = lazy(() => import('./components/App/App'));
const Annonce = lazy(() => import('./components/Annonce/Annonce'));
const Profil = lazy(() => import('./components/Profil/Profil'));
const EditProfil = lazy(
  () => import('./components/Profil/EditProfil/EditProfil')
);
const EditAnnonce = lazy(
  () => import('./components/Profil/EditAnnonce/EditAnnonce')
);
const Login = lazy(() => import('./components/Login/Login'));
const SignIn = lazy(() => import('./components/SignIn/SignIn'));
const SendMailForgotPassword = lazy(
  () =>
    import(
      './components/forgotPassword/sendMailForgotPassword/sendMailForgotPassword'
    )
);
const FormNewPassword = lazy(
  () => import('./components/forgotPassword/formNewPassword/formNewPassword')
);
// Import des composants ne nécessitant pas de lazy loading
import Error404 from './components/error/Error404';
import Loader from './components/Loader/Loader';
import './styles/index.scss';
import { AuthProvider } from './context/AuthContext';

// Création de la racine de l'application
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Création du router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<App />} />
      <Route path="/annonce" element={<Annonce />} />
      <Route path="/profile/:id" element={<Profil />} />
      <Route path="/edit-profil/:id" element={<EditProfil />} />
      <Route path="/edit-annonce/:id" element={<EditAnnonce />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/inscription" element={<SignIn />} />
      <Route path="/mot-de-passe-oublie" element={<SendMailForgotPassword />} />
      <Route path="/nouveau-mot-de-passe" element={<FormNewPassword />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

// Rendu de l'application
root.render(
  <AuthProvider>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  </AuthProvider>
);

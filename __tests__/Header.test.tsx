//* Test d'interaction avec le composant

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import { AuthProvider, AuthContextType } from '../src/context/AuthContext';

// Mock de la fonction logout
// Mock = fonction fictive qui permet de simuler le comportement d'une fonction réelle
const mockLogout = vi.fn();

// Fonction pour rendre le composant Header avec le contexte d'authentification
const renderWithAuthContext = (contextValue: AuthContextType) => {
  return render(
    <AuthProvider value={contextValue}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthProvider>
  );
};

// Test du composant Header
describe('Header component', () => {
  beforeEach(() => {
    mockLogout.mockClear();
  });
  // Test qui vérifie que le composant Header rend les liens lorsque l'utilisateur n'est pas connecté
  it('should render the Header with links when user is not logged in', () => {
    renderWithAuthContext({ userId: null, login: vi.fn(), logout: mockLogout });

    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Joueurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
  });
  // Test qui vérifie que le composant Header rend les liens lorsque l'utilisateur est connecté
  it('should render the Header with links when user is logged in', () => {
    renderWithAuthContext({
      userId: '123',
      login: vi.fn(),
      logout: mockLogout,
    });

    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Joueurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Deconnexion/i)).toBeInTheDocument();
  });
  // Test qui vérifie que la fonction logout est appelée lorsque le lien Deconnexion est cliqué
  it('should call logout when Deconnexion link is clicked', () => {
    renderWithAuthContext({
      userId: '123',
      login: vi.fn(),
      logout: mockLogout,
    });
    // Récupérer le lien Deconnexion
    const logoutLink = screen.getByText(/Deconnexion/i);
    fireEvent.click(logoutLink);
    // Vérifier que la fonction logout a été appelée
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});

//* Test de rendu de composant + interaction utilisateur

// Ce test vérifie que le composant Header affiche les bons liens lorsque l'utilisateur est connecté
import { render, screen } from '@testing-library/react';
// MemoryRouter est un composant de react-router-dom qui permet de simuler un router pour les tests
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import Header from '../src/components/Header/Header';
import { AuthProvider, AuthContextType } from '../src/context/AuthContext';

describe('Header', () => {
  it('should render correct links when logged in', () => {
    // Mock du contexte d'authentification
    const mockAuthContextValue: AuthContextType = {
      // userId est une chaîne de caractères arbitraire pour simuler un utilisateur connecté
      userId: '123',
      // login et logout ici servent juste à éviter une erreur de typage
      login: () => {},
      logout: () => {},
    };

    // Rendu du composant Header avec le AuthProvider et le mock du contexte
    render(
      <MemoryRouter>
        <AuthProvider value={mockAuthContextValue}>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    // Assertions pour vérifier que les liens attendus sont présents dans le rendu
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Joueurs')).toBeInTheDocument();
    expect(screen.getByText('Mon profil')).toBeInTheDocument();
    expect(screen.getByText('Deconnexion')).toBeInTheDocument();
  });
});

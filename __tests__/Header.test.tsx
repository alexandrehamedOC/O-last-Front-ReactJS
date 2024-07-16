// // __tests__/Header.test.tsx
// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import Header from '../src/components/Header/Header';
// import { AuthContext, AuthProvider } from '../src/context/AuthContext';

// const mockLogout = vi.fn();

// const renderWithAuthContext = (contextValue) => {
//   return render(
//     <AuthContext.Provider value={contextValue}>
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     </AuthContext.Provider>
//   );
// };

// describe('Header component', () => {
//   beforeEach(() => {
//     mockLogout.mockClear();
//   });

//   it('should render the Header with links when user is not logged in', () => {
//     renderWithAuthContext({ userId: null, login: vi.fn(), logout: mockLogout });

//     expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
//     expect(screen.getByText(/Joueurs/i)).toBeInTheDocument();
//     expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
//     expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
//   });

//   it('should render the Header with links when user is logged in', () => {
//     renderWithAuthContext({
//       userId: '123',
//       login: vi.fn(),
//       logout: mockLogout,
//     });

//     expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
//     expect(screen.getByText(/Joueurs/i)).toBeInTheDocument();
//     expect(screen.getByText(/Mon profil/i)).toBeInTheDocument();
//     expect(screen.getByText(/Deconnexion/i)).toBeInTheDocument();
//   });

//   it('should call logout when Deconnexion link is clicked', () => {
//     renderWithAuthContext({
//       userId: '123',
//       login: vi.fn(),
//       logout: mockLogout,
//     });

//     const logoutLink = screen.getByText(/Deconnexion/i);
//     fireEvent.click(logoutLink);

//     expect(mockLogout).toHaveBeenCalledTimes(1);
//   });
// });
